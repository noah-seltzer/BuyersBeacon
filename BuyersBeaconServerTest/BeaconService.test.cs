using Microsoft.EntityFrameworkCore;
using Moq;
using server.Data;
using server.Services;
using server.Models;
using System.ComponentModel;
using Clerk.BackendAPI.Hooks;
using System.Net.Sockets;
using MoqHelper.MockDbContextAsynced;

namespace BuyersBeaconServerTest
{
    public class BeaconServiceTest
    {
        private readonly BeaconService _beaconService;
        private readonly MockDbContextAsynced<ApplicationDbContext> _mockDbContext;
        //private readonly Mock<ApplicationDbContext> _mockDbContext;
        private readonly Mock<DbSet<Beacon>> _mockBeaconDbSet;
        private readonly List<Beacon> _testData;
        private readonly Beacon _testBeacon;

        private readonly Guid _testId;
        public BeaconServiceTest()
        {
            //_mockDbContext = new Mock<ApplicationDbContext>();
            _mockDbContext = new MockDbContextAsynced<ApplicationDbContext>();
            //_mockDbContext.AddDbSetData<Beacon>(_test)
            //_mockBeaconDbSet = new Mock<DbSet<Beacon>>();



            _testId = Guid.NewGuid();
            Console.WriteLine(_testId
            _testBeacon = new Beacon()
            {
                BeaconId = _testId,
            };
            _testData = new List<Beacon> {
                _testBeacon,
            };


            _mockDbContext.AddDbSetData(_testData);

            _beaconService = new BeaconService(_mockDbContext.Object);

            //_mockDbContext.Beacons.SingleAsync();

        }
        [Trait("Category", "Beacon Service Tests")]
        [Fact(DisplayName = "Beacon Service GetbyId")]
        public async void Test1()
        {
            //_mockDbContext.Setup(c => c.Beacons).Returns(_mockBeaconDbSet.Object);
            //_mockDbContext
            var beacons = await _beaconService.GetById(_testId);
            //Assert.NotNull(beacons);
            //_mockBeaconDbSet.As<Beacon>().Setup()

            //_mockBeaconDbSet.Verify(m => m.Where(It.), Times.Once());
            //mockContext.Verify(m => m.SaveChanges(), Times.Once());

            //mockSet.Verify(m => m.Add(It.IsAny<Blog>()), Times.Once());
            // var blog = _context.Blogs.Add(new Blog { Name = name, Url = url });
        }
    }
}
