using Api_Assignment.Models;
using Api_Assignment.Services;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace Api_Assignment.Controllers
{
    public class HomeController : Controller
    {

        private readonly MealService _mealService;
        private readonly WeatherService _weatherService;
        private readonly MovieService _movieService;


        public HomeController(MealService mealService, WeatherService weatherService, MovieService movieService)
        {
            _mealService = mealService;
            _weatherService = weatherService;
            _movieService = movieService;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public IActionResult weather()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> weather(string city)
        {
            if (string.IsNullOrWhiteSpace(city))
            {
                ModelState.AddModelError(string.Empty, "Please enter a city name.");
                return View();
            }

            var weather = await _weatherService.GetWeatherAsync(city);

            if (weather == null)
            {
                ModelState.AddModelError(string.Empty, "Could not retrieve weather data. Please try again.");
                return View();
            }

            var viewModel = new WeatherViewModel
            {
                City = weather.Name,
                Temperature = (int)(weather.Main.Temp - 273.15),
                Description = weather.Weather[0].Description,
                Icon = weather.Weather[0].Icon
            };

            return View(viewModel);
        }

        [HttpGet]
        public IActionResult Movie()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Movie(string movie)
        {
            if (string.IsNullOrEmpty(movie))
            {
                TempData["Error"] = "Please enter a movie name.";
                return View();
            }

            var movieDetails = await _movieService.GetMovieAsync(movie);
            return View("MovieDetails", movieDetails);
        }



        public async Task<IActionResult> meal()
        {
            var meals = await _mealService.GetMealsAsync("chicken_breast");
            return View(meals.Meals);
        }




        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
