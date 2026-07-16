using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using MyTools.Web;
using MyTools.Web.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<InteropService>();
builder.Services.AddScoped<AppState>();
builder.Services.AddScoped<MapEditorState>();
builder.Services.AddScoped<MapCanvasInterop>();

await builder.Build().RunAsync();
