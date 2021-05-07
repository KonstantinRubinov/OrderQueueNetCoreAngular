using System.Collections.Generic;

namespace OrderQueue
{
	public interface IUsersRepository
	{
		List<User> GetAllUsers();
		User CallNextUser();
		User AddUser(User userModel);
	}
}
