from docx import Document
from domain.entities.document import DocumentText

class ShowTextDocumentRepository:
    def __init__(self, path: str) -> None:
        self.path = path

    def get_text_from_file_docx(self) -> list[str]:
        
        try:
            print(self.path)
            doc: Document = Document(self.path)  
           
            full_text: list[str] = [] 
            for para in doc.paragraphs:
                full_text.append(para.text)
            return full_text
        except Exception as e:
            raise e
