using Dapper;
using Microsoft.AspNetCore.Connections;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.Sqlite;
using System;
using System.Buffers;
using System.ComponentModel;
using System.Diagnostics;
using System.Runtime.ConstrainedExecution;
using System.Text.Json;
using System.Xml.Linq;

namespace gig_test8.Server.Hubs
{
    public class services
    { 
       
    }
    public class server_manage : Hub
    {
        public async Task signup_user(string fn,string ln,string email,string pass,string pimgepath)
        {
            var connection = new SqliteConnection("Data Source=database.db");

            await connection.OpenAsync();

            var command = connection.CreateCommand();
            command.CommandText = "INSERT INTO users (fn, ln, email, pass, pimgpath) VALUES ($fn, $ln, $email, $pass, $pimgpath);";
            command.Parameters.AddWithValue("$fn", fn);
            command.Parameters.AddWithValue("$ln", ln);
            command.Parameters.AddWithValue("$email", email);
            command.Parameters.AddWithValue("$pass", pass);
            command.Parameters.AddWithValue("$pimgpath", pimgepath);

           await command.ExecuteNonQueryAsync();


        }
        public async Task signup_sp(string fn, string ln, string email, string pass, string pimgepath,string company_name,string blicense)
        {
            var connection = new SqliteConnection("Data Source=database.db");

            await connection.OpenAsync();

            var command = connection.CreateCommand();
            command.CommandText = "INSERT INTO service_providers (fn, ln, email, pass, pimgpath, blicense, companyname) VALUES ($fn, $ln, $email, $pass, $pimgpath, $blicense, $companyname);";
            command.Parameters.AddWithValue("$fn", fn);
            command.Parameters.AddWithValue("$ln", ln);
            command.Parameters.AddWithValue("$email", email);
            command.Parameters.AddWithValue("$pass", pass);
            command.Parameters.AddWithValue("$pimgpath", pimgepath);
            command.Parameters.AddWithValue("$blicense", blicense);
            command.Parameters.AddWithValue("$companyname", company_name);

            await command.ExecuteNonQueryAsync();

        }
        public async Task<string> login_user(string email,string password)
        {
            var connection = new SqliteConnection("Data Source=database.db");

            await connection.OpenAsync();

            var command = connection.CreateCommand();
            string query = "SELECT EXISTS(SELECT 1 FROM users WHERE email = $email);";

            command.CommandText = query;
            command.Parameters.AddWithValue("$email", email);
            var result = (long)await command.ExecuteScalarAsync();
            bool exists = result == 1;
            var command2 = connection.CreateCommand();
            string query2 = "SELECT EXISTS(SELECT 1 FROM users WHERE pass = $pass);";

            command2.CommandText = query2;
            command2.Parameters.AddWithValue("$pass", password);
            var result2 = (long)await command.ExecuteScalarAsync();
            bool exists2 = result2 == 1;
            bool exists3 = false;
            if(exists==true && exists2 == true)
            {
                exists3 = true;
            }
            else
            {
                exists3 = false;
            }
            await connection.CloseAsync();
            return "true";

        }
        public async Task<bool> login_service_provider(string email, string password) 
        {
            var connection = new SqliteConnection("Data Source=database.db");

            await connection.OpenAsync();

            var command = connection.CreateCommand();
            string query = "SELECT EXISTS(SELECT 1 FROM service_providers WHERE email = $email);";

            command.CommandText = query;
            command.Parameters.AddWithValue("$email", email);
            var result = (long)await command.ExecuteScalarAsync();
            bool exists = result == 1;
            var command2 = connection.CreateCommand();
            string query2 = "SELECT EXISTS(SELECT 1 FROM service_providers WHERE pass = $pass);";

            command2.CommandText = query2;
            command2.Parameters.AddWithValue("$pass", password);
            var result2 = (long)await command.ExecuteScalarAsync();
            bool exists2 = result2 == 1;
            bool exists3 = false;
            if (exists == true && exists2 == true)
            {
                exists3 = true;
            }
            await connection.CloseAsync();
            return exists3;
        }
        public async Task SendMessage(string user, string message)
        {
            // Broadcasts to all connected clients
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task<string> FetchData(string RequestParam)
        {
            // Process data...
            return $"Processed data for ghjgjgjh";
        }
        public async Task login_try_user(string email,string e_pass)
        {
            string connectionString = "Data Source=database.db";

            // 2. Define your primary key value to search for
            string e = email;

            using (var connection = new SqliteConnection(connectionString))
            {
                await connection.OpenAsync();

                // 3. Create the SQL query using a parameterized target key
                string query = "SELECT * FROM users WHERE email = @email LIMIT 1";

                using (var command = new SqliteCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@email", e);

                    using (var reader = command.ExecuteReader())
                    {
                        // 4. Read the record if it exists
                        if (reader.Read())
                        {
                            int passid = reader.GetOrdinal("pass");
                            string pass = reader.GetString(passid);
                            if (pass == e_pass) {
                                await Clients.Caller.SendAsync("login_result", "true");
                   
                            }
                            else
                            {
                                await Clients.Caller.SendAsync("login_result","false");
                            }
                            // Safely pull columns by name or index
                            
                        }
                        else
                        {
                            await Clients.Caller.SendAsync("login_result", "false");
                        }
                    }
                }
            }
        }
        public async Task login_try_sp(string email, string e_pass)
        {
            string connectionString = "Data Source=database.db";

            // 2. Define your primary key value to search for
            string e = email;

            using (var connection = new SqliteConnection(connectionString))
            {
               await connection.OpenAsync();

                // 3. Create the SQL query using a parameterized target key
                string query = "SELECT * FROM service_providers WHERE email = @email LIMIT 1";

                using (var command = new SqliteCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@email", e);

                    using (var reader = command.ExecuteReader())
                    {
                        // 4. Read the record if it exists
                        if (reader.Read())
                        {
                            int passid = reader.GetOrdinal("pass");
                            string pass = reader.GetString(passid);
                            if (pass == e_pass)
                            {
                                await Clients.Caller.SendAsync("login_result", "true");
                               
                            }
                            else
                            {
                                await Clients.Caller.SendAsync("login_result", "false");
                            }
                            // Safely pull columns by name or index
                           

                        }
                        else
                        {
                            await Clients.Caller.SendAsync("login_result", "false");
                        }
                        await connection.CloseAsync();
                    }
                }
            }
        }
        public async Task save_service( string name, string service, string price, string skills, string mobile,string image)
        {
            string c_email=null;
            string c_pass=null;
            string connectionString = "Data Source=database.db";
            string previous_data = "";
            
            using (var connection = new SqliteConnection(connectionString))
            {
                await connection.OpenAsync();
                string query1 = "SELECT * FROM current WHERE id = 1 LIMIT 1";
                using (var command = new SqliteCommand(query1, connection))
                {
                    command.Parameters.AddWithValue("@email", c_email);
                    using (var reader = command.ExecuteReader())
                    {
                        // 4. Read the record if it exists
                        if (reader.Read())
                        {
                            int ei = reader.GetOrdinal("email");
                            string e = reader.GetString(ei);
                            c_email = e;
                            int pi = reader.GetOrdinal("pass");
                            string p = reader.GetString(pi);
                            c_pass = p;


                        }
                    }
                }


                // 3. Create the SQL query using a parameterized target key
                string query = "SELECT * FROM service_providers WHERE email = @email LIMIT 1";
                string sql = "UPDATE service_providers SET services = @newValue WHERE email = @email";

                using (var command = new SqliteCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@email", c_email);

                    using (var reader = command.ExecuteReader())
                    {
                        // 4. Read the record if it exists
                        if (reader.Read())
                        {
                            int serid = reader.GetOrdinal("services");
                            string ser = reader.GetString(serid);
                            previous_data = ser;


                        }
                    }
                    
                }
                string new_data = "";
                if (!string.IsNullOrEmpty(previous_data)) {
                    List<List<string>> deserializedList = JsonSerializer.Deserialize<List<List<string>>>(previous_data);
                    List<string> s= new List<string> { name, service, price, skills, mobile,image };
                    deserializedList.Add(s);
                    new_data= JsonSerializer.Serialize(deserializedList);
                }
                else
                {
                    List<List<string>> deserializedList = new List<List<string>>();
                    List<string> s = new List<string> { name, service, price, skills, mobile,image };
                    deserializedList.Add(s);
                    new_data = JsonSerializer.Serialize(deserializedList);

                }
                

                using (var command = new SqliteCommand(sql, connection))
                {
                    // Use parameters to prevent SQL injection
                    command.Parameters.AddWithValue("@email", c_email);
                    command.Parameters.AddWithValue("@newValue", new_data);
                    

                    await command.ExecuteNonQueryAsync();
                }
                await connection.CloseAsync();
            }
        }
        public async Task get_services()
        {
           
            string connectionString = "Data Source=database.db";
            string c_email = null;

            string c_role = null;

            // 2. Define your primary key value to search for


            using (var connection = new SqliteConnection(connectionString))
            {
                await connection.OpenAsync();
                string query1 = "SELECT * FROM current WHERE id = 1 LIMIT 1";
                using (var command = new SqliteCommand(query1, connection))
                {
                    command.Parameters.AddWithValue("@email", c_email);
                    using (var reader = command.ExecuteReader())
                    {
                        // 4. Read the record if it exists
                        if (reader.Read())
                        {
                            int ei = reader.GetOrdinal("email");
                            string e = reader.GetString(ei);
                            c_email = e;
                            int ri = reader.GetOrdinal("role");
                            string r = reader.GetString(ri);
                            c_role = r;


                        }
                    }

                }
                // 3. Create the SQL query using a parameterized target key
                string query = "SELECT * FROM service_providers WHERE email = @email LIMIT 1";
                if (c_role == "sp")
                {
                    using (var command = new SqliteCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@email", c_email);

                        using (var reader = command.ExecuteReader())
                        {
                            // 4. Read the record if it exists
                            if (reader.Read())
                            {
                                int serid = reader.GetOrdinal("services");
                                string ser = reader.GetString(serid);
                                if (!string.IsNullOrEmpty(ser))
                                {

                                    await Clients.Caller.SendAsync("home_first_services", ser);
                                    await connection.CloseAsync();
                                }
                                else
                                {
                                    await Clients.Caller.SendAsync("home_first_services", ser);
                                    await connection.CloseAsync();
                                }


                                // Safely pull columns by name or index

                            }

                        }
                    }
                }
                else
                {
                    List<List<string>> all_Ser= new List<List<string>>();
                    var user_ser = "SELECT * FROM service_providers";
                    using var command = new SqliteCommand(user_ser, connection);

                    using var reader = command.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            int serid = reader.GetOrdinal("services");
                            string ser = reader.GetString(serid);
                            List<List<string>> current_ser= JsonSerializer.Deserialize<List<List<string>>>(ser);
                            if (all_Ser.Count == 0)
                            {
                                all_Ser = current_ser;
                            }
                            else
                            {
                                all_Ser.AddRange(current_ser);
                            }

                        }
                    }
                    string data= JsonSerializer.Serialize(all_Ser);

                    await Clients.Caller.SendAsync("home_first_services", data);
                    await connection.CloseAsync();
                }
            }
        }
        public async Task save_current_user(string email, string pass,string role)
        {
            string connectionString = "Data Source=database.db";

            // 2. Write the UPDATE query using parameters to stay safe from hackers
            string sql = "UPDATE current SET email = @email, pass = @pass, role = @role WHERE id = @idd";

            using (var connection = new SqliteConnection(connectionString))
            {
               await connection.OpenAsync();

                using (var command = new SqliteCommand(sql, connection))
                {
                    
                    // 3. Fill in the parameters with your actual data
                    command.Parameters.AddWithValue("@email", email);
                    command.Parameters.AddWithValue("@pass", pass);
                   
                    command.Parameters.AddWithValue("@role", role);
                    command.Parameters.AddWithValue("@idd", "1");
                    // The specific ID you want to target

                    // 4. Run the command against the database
                    int rows=await command.ExecuteNonQueryAsync();
                    



                }
                await connection.CloseAsync();
            }
        }
        public async Task get_curent_user()
        {
            string connectionString = "Data Source=database.db";
            string c_email = null;

            string c_role = null;

            // 2. Define your primary key value to search for


            using (var connection = new SqliteConnection(connectionString))
            {
                await connection.OpenAsync();
                string query1 = "SELECT * FROM current WHERE id = 1 LIMIT 1";
                using (var command = new SqliteCommand(query1, connection))
                {
                    command.Parameters.AddWithValue("@email", c_email);
                    using (var reader = command.ExecuteReader())
                    {
                        // 4. Read the record if it exists
                        if (reader.Read())
                        {
                            int ei = reader.GetOrdinal("email");
                            string e = reader.GetString(ei);
                            c_email = e;
                            int ri = reader.GetOrdinal("role");
                            string r = reader.GetString(ri);
                            c_role = r;


                        }
                        await Clients.Caller.SendAsync("current_user_type", c_role);
                        await connection.CloseAsync();
                    }

                }
            }
        }



    }
}
