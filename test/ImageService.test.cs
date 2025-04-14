using Microsoft.AspNetCore.Http;
using server.Services;
using server.Util;

using Microsoft.EntityFrameworkCore;
using server.Models;
using server.Data;
using Moq;
using Azure.Storage.Blobs.Models;

namespace test
{
    public class MockBlobServiceManager : IBlobServiceManager
    {
        public async Task<BlobContentInfo> uploadFile(string name, Stream fileStream, string MimeType)
        {
            return null;
        }

        public void init()
        {
            // do nothing
        }
    }

    public class MockImageService : ImageService
    {
        public MockImageService(ApplicationDbContext context): base(context)
        {
            _context = context;
            _blobServiceManager = new MockBlobServiceManager();
        }
    }

    public class ImageServiceTest
    {

        ImageService createMockService()
        {
            var mockSet = new Mock<DbSet<ImageSet>>();
            var mockContext = new Mock<ApplicationDbContext>();
            mockContext.Setup(c => c.ImageSets).Returns(mockSet.Object);
            return new MockImageService(mockContext.Object);
        }

        [Fact(DisplayName = "Test Generate Image")]
        public void TestGenerateImage()
        {
            var imageService = createMockService();
            var content = "Hello World from a Fake File";
            var fileName = "test.pdf";
            var stream = new MemoryStream();
            var writer = new StreamWriter(stream);
            writer.Write(content);
            writer.Flush();
            stream.Position = 0;
            var testFile = new FormFile(stream, 0, stream.Length, "name1", "name2")
            {
                Headers = new HeaderDictionary(),
                ContentType = "application/pdf",
            };
            var image = imageService.GenerateImage(testFile, null);
            Assert.IsType<string>(image.ExternalImageId);
            Assert.Equal(image.MimeType, testFile.ContentType);
            Assert.Equal(image.FileName, testFile.FileName);
        }

        [Fact(DisplayName = "Test Add Images to beacon")]
        public async void TestAddImageset()
        {
            var imageService = createMockService();
            var beacon = new Beacon();
            beacon.Images = [];
            beacon.Image = null;
            var after = await imageService.CreateImagesetForNewBeacon(beacon, beacon);
            Assert.Null(after.ImageSet);
        }
    }
}