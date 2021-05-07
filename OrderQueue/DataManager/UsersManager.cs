using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace OrderQueue
{
	public class UsersManager : DataBase, IUsersRepository
	{
		public UsersManager()
		{
		}


		public User AddUser(User userModel)
		{
			DataTable dt = new DataTable();
			using (SqlCommand command = new SqlCommand())
			{
				dt = GetMultipleQuery(UserStringsSql.AddUser(userModel));
			}
			User user = null;
			foreach (DataRow ms in dt.Rows)
			{
				user = User.ToObject(ms);
			}

			return user;
		}

		public User CallNextUser()
		{
			DataTable dt = new DataTable();
			using (SqlCommand command = new SqlCommand())
			{
				dt = GetMultipleQuery(UserStringsSql.CallNextUser());
			}
			User userModel = null;
			foreach (DataRow ms in dt.Rows)
			{
				userModel = User.ToObject(ms);
			}

			return userModel;
		}

		public List<User> GetAllUsers()
		{
			DataTable dt = new DataTable();
			List<User> arrUser = new List<User>();

			using (SqlCommand command = new SqlCommand())
			{
				dt = GetMultipleQuery(UserStringsSql.GetAllUsers());
			}

			foreach (DataRow ms in dt.Rows)
			{
				arrUser.Add(User.ToObject(ms));
			}

			return arrUser;
		}
	}
}
