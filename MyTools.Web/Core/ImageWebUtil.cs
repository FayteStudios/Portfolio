using System;
using System.IO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.PixelFormats;

namespace MyTools
{
    public static class ImageWebUtil
    {
        public static string ToPngDataUrl(Image<Rgba32> image)
        {
            using MemoryStream stream = new();
            image.Save(stream, new PngEncoder());
            return "data:image/png;base64," + Convert.ToBase64String(stream.ToArray());
        }
    }
}
