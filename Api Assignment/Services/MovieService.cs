using Api_Assignment.Models;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Api_Assignment.Services
{
    public class MovieService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey = "5b085527"; 

        public MovieService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<Movie> GetMovieAsync(string title)
        {
            var response = await _httpClient.GetAsync($"http://www.omdbapi.com/?t={title}&apikey={_apiKey}");
            response.EnsureSuccessStatusCode();
            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<Movie>(content);
        }
    }
}
