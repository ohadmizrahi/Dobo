import platform
import subprocess
import tempfile

class CupsPrinter:
    def __init__(self, printer_name):
        self.printer_name = printer_name

    def __str__(self) -> str:
        return f"CupsPrinter: {self.printer_name}"

    def connect(self):
        try:
            print(f"Connecting to printer: {self.printer_name}...")
            result = subprocess.run(["lpstat", "-p"], capture_output=True, text=True, check=True)
            printers = [p.split(" ")[1] for p in result.stdout.split("\n") if "printer" in p]

            if self.printer_name not in printers:
                raise ValueError(f"Printer {self.printer_name} does not exist.")

            return self

        except subprocess.CalledProcessError as e:
            raise ValueError("Failed to check printer status.") from e

    async def send_to_printer(self, data):
        if platform.system() != 'Linux':
            raise OSError("Printing using Cups is only supported on Linux.")
        try:
            print(f"Printing to {self}...")
            with tempfile.NamedTemporaryFile(delete=True) as temp:
                temp.write(data)
                temp.flush()
                subprocess.run(["lp", "-d", self.printer_name, temp.name])
        except subprocess.CalledProcessError as e:
            raise RuntimeError("Failed to print file.") from e
        

# handle error:
# import subprocess

# def restart_cups(password):
#     command = 'echo {} | sudo -S service cups restart'.format(password)
#     process = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
#     stdout, stderr = process.communicate()

#     if process.returncode != 0:
#         # There was an error
#         print(stderr.decode())
#     else:
#         print(stdout.decode())

# # Replace 'your_password' with your actual password
# restart_cups('your_password')