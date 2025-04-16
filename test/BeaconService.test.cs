using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Services;
using server.Data;
using Moq;
using Microsoft.OpenApi.Validations;


namespace test
{
    class BeaconTestMocks
    {
        public BeaconService service;
        public Mock<ApplicationDbContext> mockContext;
        public Mock<DbSet<Beacon>> mockDbSet;
    }
    public class BeaconServiceTest
    {
        readonly Guid _guid = Guid.NewGuid();
        readonly Guid _userGuid = Guid.NewGuid();
        private readonly string _itemName = "bordeaux";

        private BeaconTestMocks createMockBeaconService()
        {
            var guid = Guid.NewGuid();
            var data = new List<Beacon>
            {
                new Beacon { BeaconId = _guid, ItemName= _itemName, UserId = _userGuid},
                new Beacon { BeaconId = _guid, ItemName= _itemName, UserId = _userGuid, IsDraft = true}
            }.AsQueryable();

            var mockSet = new Mock<DbSet<Beacon>>();

            mockSet.As<IQueryable<Beacon>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Beacon>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Beacon>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Beacon>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());

            var mockContext = new Mock<ApplicationDbContext>();
            mockContext.Setup(c => c.Beacons).Returns(mockSet.Object);
            var service = new BeaconService(mockContext.Object);
            var testObj = new BeaconTestMocks
            {
                service = service, mockContext = mockContext, mockDbSet = mockSet
            };
            return testObj;
        }

        [Fact(DisplayName = "Get Beacon By Id")]
        public void TestGetById()
        {
            
            var service = createMockBeaconService().service;
            var beacon = service.GetById(_guid);

            Assert.Equal(_itemName, beacon.ItemName);
        }

        [Fact(DisplayName = "Get List of Beacons")]
        public async void TestGetList()
        {
            var service = createMockBeaconService().service;
            var beacons = service.GetList();
            Assert.NotNull(beacons);
            Assert.Single(beacons);
            Assert.Equal(_itemName, beacons.First().ItemName);
        }

        [Fact(DisplayName = "Get List of Drafts")]
        public void TestGetListDrafts()
        {
            var mocks = createMockBeaconService();
            var service = mocks.service;
            var context = mocks.mockContext;
            var set = mocks.mockDbSet;
            var beacons = service.GetList(_userGuid, drafts: true);
            Assert.True(beacons.First().IsDraft);
            
        }

        [Fact(DisplayName = "Test Create Beacon")]
        public void TestCreate()
        {
            var userId = Guid.NewGuid();
            var price = 50;
            Beacon createDto = new Beacon
            {
                ItemName = _itemName,
                UserId = userId,
                ItemPrice = price
            };
            var service = createMockBeaconService().service;
            var beacon = service.Create(createDto);
            
            Assert.Equal("Draft description", beacon.ItemDescription);
            Assert.Equal(userId, beacon.UserId);
            Assert.Equal(price , beacon.ItemPrice);
        }


    }
}
