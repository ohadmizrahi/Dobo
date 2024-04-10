import platform
import io
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageTemplate
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus.frames import Frame
import subprocess
import tempfile

table_data = [{'name': 'test', 'quantity': 3}, {'name': 'test2', 'quantity': 3}]
buffer = io.BytesIO()

if platform.system() == 'Linux':
    doc = SimpleDocTemplate(buffer, pagesize=letter)

    styles = getSampleStyleSheet()
    styles['Heading1'].alignment = 1  # 1 is center alignment
    header = Paragraph("Table Number: 1", styles['Heading1'])

    spacer = Spacer(1, 25)

    table = Table(table_data, hAlign='CENTER')

    style = TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),  # Make all text bold
        ('FONTSIZE', (0, 0), (-1, -1), 14),  # Increase text size to 14
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12)  # Apply padding to all cells
    ])
    table.setStyle(style)

    frame = Frame(50, 50, 500, 700, id='normal')

    template = PageTemplate(id='main', frames=[frame])

    doc.addPageTemplates([template])

    story = [header, spacer, table]

    doc.build(story)

    pdf_data = buffer.getvalue()

    def print_file(printer_name, data):
        with tempfile.NamedTemporaryFile(delete=True) as temp:
            temp.write(data)
            temp.flush()
            subprocess.run(["lp", "-d", printer_name, temp.name])

    print_file("home", pdf_data)