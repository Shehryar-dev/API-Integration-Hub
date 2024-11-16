using Api_Assignment.Models;
using Newtonsoft.Json;

public class MealService
{
    private readonly HttpClient _httpClient;

    public MealService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<MealApiResponse> GetMealsAsync(string ingredient)
    {
        var response = await _httpClient.GetStringAsync($"https://www.themealdb.com/api/json/v1/1/filter.php?i={ingredient}");

        return JsonConvert.DeserializeObject<MealApiResponse>(response);
    }
}

public class MealApiResponse
{
    public List<Meal> Meals { get; set; }
}

