using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using Microsoft.OpenApi.Models;
using System.Text.Json.Serialization;
using server.Services;
using server.Hubs;
using server.Util;
using dotenv.net;

var builder = WebApplication.CreateBuilder(args);

DotEnv.Load();

builder.Services.AddControllersWithViews().AddJsonOptions(options => options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
builder.Services.AddSignalR();
var connString = builder.Configuration.GetConnectionString("DefaultConnection");
// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "BuyersBeacon API",
        Version = "v1",
        Description = "API documentation for BuyersBeacon server"
    });

    // Enable XML comments in Swagger
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins(
                             "http://localhost:3000",
                             "http://localhost:3000",
                             "http://buyers-beacon-client-git-main-noahseltzers-projects.vercel.app",
                             "http://buyers-beacon-client-git-main-noahseltzers-projects.vercel.app",
                             "https://buyers-beacon-client.vercel.app")
                             .AllowAnyHeader()
                             .AllowAnyMethod()
                             .AllowCredentials();
        });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddScoped<ICategoryService, CategoryService>()
    .AddScoped<IBeaconService, BeaconService>()
    .AddScoped<IImageService, ImageService>()
    .AddScoped<IClerkService, ClerkService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();

app.UseRouting();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapHub<ChatHub>("/chathub");


app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "BuyersBeacon API V1");
    c.RoutePrefix = string.Empty; // This makes Swagger UI the default page
});


app.Run();