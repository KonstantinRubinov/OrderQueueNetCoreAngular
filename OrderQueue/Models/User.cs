using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Diagnostics;

namespace OrderQueue
{
	public class User
	{
		private int _userOrderNumber;
		private string _userName;
		private long _userTime;
		private int _userStatus;

		public int userOrderNumber
		{
			get { return _userOrderNumber; }
			set { _userOrderNumber = value; }
		}

		[Required(ErrorMessage = "Missing user name.")]
		[StringLength(40, ErrorMessage = "User name can't exceeds 40 chars.")]
		[MinLength(2, ErrorMessage = "User name mast be minimum 2 chars.")]
		public string userName
		{
			get { return _userName; }
			set { _userName = value; }
		}

		public long userTime
		{
			get { return _userTime; }
			set { _userTime = value; }
		}

		public int userStatus
		{
			get { return _userStatus; }
			set { _userStatus = value; }
		}



		public override string ToString()
		{
			return
				userOrderNumber + " " +
				userName + " " +
				userTime + " " +
				userStatus;
		}


		public static User ToObject(DataRow reader)
		{
			User userModel = new User();
			userModel.userOrderNumber = int.Parse(reader[0].ToString());
			userModel.userName = reader[1].ToString();
			userModel.userTime = long.Parse(reader[2].ToString());
			userModel.userStatus = int.Parse(reader[3].ToString());

			Debug.WriteLine("User:" + userModel.ToString());
			return userModel;
		}
	}
}
