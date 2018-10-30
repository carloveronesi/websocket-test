using SampleBase;
using System;
using System.Threading;
using System.Threading.Tasks;
using WebSocketRPC;

/// <summary>
/// "Documentazione"
/// https://www.codeproject.com/Articles/1210957/Introducing-Lightweight-WebSocket-RPC-Library-for
/// </summary>

namespace TestServer
{
	public class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Server\n");

			//start server and bind to its local and remote API
			var cts = new CancellationTokenSource();
			var t = Server.ListenAsync("http://localhost:8001/", cts.Token, (c, wc) =>
			{
				//Connect action
				c.OnOpen += () => Task.Run((Action)connected);

				//Receive action
				c.OnReceive += async msg => {
					//Stampo su console
					Console.WriteLine("Client message: \n" + msg);

					//Rispondo con ack
					await c.SendAsync("I've received the following message: " + msg);

					//Chiudo connessione
					//await c.CloseAsync();
				};

				//Disconnect action
				c.OnClose += (s, d) => Task.Run((Action)disconnected);
			});

			//Waiting for connection closing
			AppExit.WaitFor(cts, t);
		}

	
		static void connected()
		{
			Console.ForegroundColor = ConsoleColor.Green;
			Console.WriteLine("Client connected.");
			Console.ForegroundColor = ConsoleColor.White;
		}

		static void disconnected()
		{
			Console.ForegroundColor = ConsoleColor.Red;
			Console.WriteLine("Client disconnected.");
			Console.ForegroundColor = ConsoleColor.White;
		}
	}
}