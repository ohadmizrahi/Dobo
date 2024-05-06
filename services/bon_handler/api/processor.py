import subprocess
import datetime
import platform
import io
import tempfile
from abc import ABC, abstractmethod
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageTemplate
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus.frames import Frame

class Proccessor(ABC):

    @property
    @abstractmethod
    def target(self):
        pass

    @property
    @abstractmethod
    def type(self):
        pass

    @abstractmethod
    async def connect(self):
        pass

    @abstractmethod
    async def process(self, message):
        pass

    def __str__(self) -> str:
        return self.type

class PrinterProcessor(Proccessor):
    def __init__(self, target, printer) -> None:
        self._target = target
        self._printer = printer

    @property
    def target(self):
        return self._target
    
    @property
    def type(self):
        return str(self._printer)
    
    async def connect(self):
        print(f'Connecting to {self._printer}...')
        self._printer.connect()

    def _build_message(self, message):
        try:
            print(f'Building message...')
            orders = message["orders"].values()
            data = [[order["name"], order["quantity"]] for order in orders]
            styles = getSampleStyleSheet()

            styles['Heading1'].alignment = 1
            header = Paragraph(f'Table Number: {message["table"]}', styles['Heading1'])
            timestamp = Paragraph(f'Time: {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', styles['Heading1'])
            spacer = Spacer(1, 25)
            table = Table(data, hAlign='CENTER')
            frame = Frame(50, 50, 500, 700, id='normal')
            template = PageTemplate(id='main', frames=[frame])

            tabel_style = TableStyle([
                ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 14),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('BOTTOMPADDING', (0, 0), (-1, -1), 12)
            ])
            table.setStyle(tabel_style)
            
            buffer = io.BytesIO()
            doc = SimpleDocTemplate(buffer, pagesize=letter)
            doc.addPageTemplates([template])
            doc.build([header, timestamp, spacer, table])
            
            print('Done building message')
            return buffer.getvalue()
        except Exception as e:
            print(f'Error building message: {e}')
            return None

    async def process(self, message):
        try:
            print(f'Processing message: {message}')
            data = self._build_message(message)
            if not data:
                raise ValueError('Failed to build message')
            await self._printer.send_to_printer(data)
            return True
        except Exception as e:
            print(f'Error processing message: {e}')
            return False


class DisplayProcessor(Proccessor):
    def __init__(self, target) -> None:
        self._target = target

    @property
    def target(self):
        return self._target
    
    @property
    def type(self):
        return 'Display'

    async def connect(self):
        print(f'Connecting to {self.target}...')
    
    async def process(self, message):
        print(f'Displaying message: {message}')