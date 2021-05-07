using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace OrderQueue
{
	[Route("api")]
	[ApiController]
	public class UsersApiController : ControllerBase
	{
		private IUsersRepository usersRepository;

		public UsersApiController(IUsersRepository _usersRepository)
		{
			usersRepository = _usersRepository;
		}

		[HttpGet("users/waiting-list")]
		public IActionResult GetAllUsers()
		{
			try
			{
				List<User> allUsers = usersRepository.GetAllUsers();
				return Ok(allUsers);
			}
			catch (Exception ex)
			{
				Errors errors = ErrorsHelper.GetErrors(ex);
				return StatusCode(StatusCodes.Status500InternalServerError, errors);
			}
		}

		[HttpGet("users")]
		public IActionResult CallNextUser()
		{
			try
			{
				User oneUser = usersRepository.CallNextUser();
				return Ok(oneUser);
			}
			catch (Exception ex)
			{
				Errors errors = ErrorsHelper.GetErrors(ex);
				return StatusCode(StatusCodes.Status500InternalServerError, errors);
			}
		}

		[HttpPost("users")]
		public IActionResult AddUser(User userModel)
		{
			try
			{
				User addedUser = usersRepository.AddUser(userModel);
				return StatusCode(StatusCodes.Status201Created, addedUser);
			}
			catch (Exception ex)
			{
				Errors errors = ErrorsHelper.GetErrors(ex);
				return StatusCode(StatusCodes.Status500InternalServerError, errors);
			}
		}
	}
}
