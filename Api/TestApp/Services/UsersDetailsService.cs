using Microsoft.EntityFrameworkCore;
using TestApp.Api.Data;
using TestApp.Api.Model;

namespace TestApp.Api.Services
{
    public class UsersDetailsService
    {
        private readonly UserDBContext _userdb;
        public UsersDetailsService(UserDBContext userdb)
        {
            _userdb = userdb;
        }

        public async Task<IEnumerable<Users>> GetAllUsers()
        {
            return await _userdb.Users.ToListAsync();
        }

        public async Task AddUsers(ContactDetails request)
        {
            var product = new Users
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                City = request.City,
                Country= request.Country,
                State = request.State,
                PostalCode = request.PostalCode,
            };

            _userdb.Users.Add(product);
            await _userdb.SaveChangesAsync();
        }

        public async Task EditUsers(ContactDetails request)
        {
            var product = _userdb.Users.Where(x => x.Email.Equals(request.Email)).First();

            if (product != null)
            {
                product.FirstName = request.FirstName;
                product.LastName = request.LastName;
                product.PhoneNumber = request.PhoneNumber;
                product.Address = request.Address;
                product.City = request.City;
                product.Country = request.Country;
                product.State = request.State;
                product.PostalCode = request.PostalCode;

                await _userdb.SaveChangesAsync();
            }
        }

        public async Task DeleteUsers(ContactDetails request)
        {
            var product = _userdb.Users.Where(x => x.Email.Equals(request.Email)).First();

            _userdb.Users.Remove(product);
            await _userdb.SaveChangesAsync();
        }
    }
}
