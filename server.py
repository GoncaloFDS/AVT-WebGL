import http.server
from http.server import HTTPServer, BaseHTTPRequestHandler
import socketserver

PORT = 9000

Handler = http.server.SimpleHTTPRequestHandler

Handler.extensions_map={
	'.html': 'text/html',
	'.css':	'text/css',
	'.js':	'application/x-javascript',
	'': 'application/octet-stream', # Default
    }

httpd = socketserver.TCPServer(("", PORT), Handler)

print("serving at port", PORT)
httpd.serve_forever()