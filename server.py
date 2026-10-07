import http.server, socketserver, os; PORT = 8080;
if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with socketserver.TCPServer(('', PORT), http.server.SimpleHTTPRequestHandler) as httpd:
        print('Client Server running at http://127.0.0.1:8080/')
        httpd.serve_forever()
