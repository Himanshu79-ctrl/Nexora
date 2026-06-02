import fitz


def extract_text_from_pdf(pdf_file):

    try:

        # reset file pointer
        pdf_file.seek(0)

        pdf = fitz.open(
            stream=pdf_file.read(),
            filetype="pdf"
        )

        text = []

        for page in pdf:
            text.append(
                page.get_text()
            )

        pdf.close()

        extracted_text = "\n".join(text).strip()

        if not extracted_text:

            raise Exception(
                "No text found in PDF."
            )

        return extracted_text

    except Exception as e:

        raise Exception(
            f"PDF extraction failed: {str(e)}"
        )