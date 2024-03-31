import win32print
import win32ui
import win32con
from reportlab.pdfgen import canvas
from xml.etree.ElementTree import ElementTree,fromstring

printer_name = win32print.GetDefaultPrinter()
print(printer_name)
drivers = win32print.EnumPrinterDrivers(None, None, 2)
hPrinter = win32print.OpenPrinter(printer_name)
print(hPrinter)
printer_info = win32print.GetPrinter(hPrinter, 2)
for driver in drivers:
    if driver["Name"] == printer_info["pDriverName"]:
        printer_driver = driver
raw_type = "XPS_PASS" if printer_driver["Version"] == 4 else "RAW"

try:
  hJob = win32print.StartDocPrinter(hPrinter, 1, ("test of raw data", None, raw_type))
  try:
    win32print.StartPagePrinter(hPrinter)
    # Create a dictionary
    data = {
        "Name": "John Doe",
        "Age": 30,
        "Location": "New York"
    }

    # Convert the dictionary to XML
    xml_data = "<root>"
    for key, value in data.items():
        xml_data += f"<{key}>{value}</{key}>"
    xml_data += "</root>"

    # Parse the XML data
    root = fromstring(xml_data)

    # Create a new PDF
    c = canvas.Canvas("temp.pdf")

    # Write the XML data to the PDF
    # (This is a very basic example - you'll need to adjust this to suit your XML structure)
    c.drawString(100, 750, f"{root.tag}: {root.text}")

    # Save the PDF
    c.save()
    win32print.WritePrinter(hPrinter, open("temp.pdf", "rb").read())
    win32print.EndPagePrinter(hPrinter)
  finally:
    win32print.EndDocPrinter(hPrinter)
finally:
  win32print.ClosePrinter(hPrinter)

# import win32print

# def list_all_printers():
#     printers = win32print.EnumPrinters(win32print.PRINTER_ENUM_LOCAL | win32print.PRINTER_ENUM_CONNECTIONS)
#     for printer in printers:
#         print(printer[2])

# list_all_printers()
