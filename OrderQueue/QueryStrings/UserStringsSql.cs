using System.Data.SqlClient;

namespace OrderQueue
{
	public class UserStringsSql
	{
		static private string procedureUsersPost = "EXEC AddUser @userName, @userTime;";
		static private string procedureUsersNext = "EXEC CallNextUser;";
		static private string procedureUsersString = "EXEC GetAllUsers;";

		static public SqlCommand GetAllUsers()
		{
			return CreateSqlCommand(procedureUsersString);
		}

		static public SqlCommand CallNextUser()
		{
			return CreateSqlCommand(procedureUsersNext);
		}

		static public SqlCommand AddUser(User userModel)
		{
			return CreateSqlCommand(userModel, procedureUsersPost);
		}

		static private SqlCommand CreateSqlCommand(User user, string commandText)
		{
			SqlCommand command = new SqlCommand(commandText);

			command.Parameters.AddWithValue("@userName", user.userName);
			command.Parameters.AddWithValue("@userTime", user.userTime);

			return command;
		}

		static private SqlCommand CreateSqlCommand(string commandText)
		{
			SqlCommand command = new SqlCommand(commandText);

			return command;
		}
	}
}
