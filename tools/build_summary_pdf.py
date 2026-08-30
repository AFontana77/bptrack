"""
Builds public/bp-central-appointment-summary.pdf.

WHAT THIS IS, AND WHY IT IS NOT THE LOG SHEET
The log sheet is where readings go as you take them: 28 rows, over a week. This
is the one page you carry into the appointment. Different job, different sheet.

The reason it is separate rather than a third page of the log is that a clinician
does not want 28 rows handed across a desk. They want the shape of the set in
under a minute: how many readings, over what dates, what the two averages were,
on what monitor, with which cuff. The log is the working document; this is the
cover note.

THE LINE THIS MUST NOT CROSS
It does not interpret. There is no category table, no traffic-light colouring,
no "your result means" box and no space labelled diagnosis. A summary sheet that
classified its own averages would be doing the one thing this site refuses to do
on paper, where nobody can add a caveat afterwards.

It also does not pretend to know what any particular practice wants. The largest
field on the page is blank and headed with the reader's own questions, because
that is the part they will otherwise forget, and there is a second blank block
for whatever the clinician tells them to do next.

WHY THE AVERAGES ARE BLANK LINES AND NOT A CALCULATION
Paper cannot add up. Printing "average: ____" and pointing at the calculator is
honest; printing a formula the reader has to execute in a waiting room is not.

CONSTRAINTS, same as the log sheet
  - Mono-printer safe. Colour is accent only.
  - Real writing space. This is filled in by hand, probably in a hurry.
  - Base-14 fonts, so the file is small and prints anywhere.
  - invariant=1, so regeneration is byte-identical and a rebuild is not a
    spurious binary diff.

Run:  py -3.11 tools/build_summary_pdf.py
"""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from pathlib import Path
import os

OUT = Path(__file__).resolve().parents[1] / "public" / "bp-central-appointment-summary.pdf"

W, H = LETTER
M = 0.62 * inch
BRAND = (0.635, 0.020, 0.098)
INK = (0.10, 0.055, 0.055)
GREY = (0.40, 0.35, 0.35)
RULE = (0.78, 0.72, 0.72)
TINT = (0.973, 0.941, 0.937)

PROTOCOL = ("Routine: American Heart Association and American Medical Association. "
            "Self-Measured Blood Pressure Monitoring at Home. Circulation. 2020;142(4):e42-e63.")
DISCLAIM = ("This sheet organises readings you took yourself. It does not interpret them, it is not "
            "medical advice, and it does not diagnose anything.")


def set_lang(c):
    """Declare the document language so a screen reader is not left guessing.

    reportlab 5.0 has no canvas.setLang(), so this goes straight onto the
    document catalogue. It MUST be wrapped in PDFString: assigning a bare
    Python str serialises as `/Lang en-US`, where `en-US` is not a valid PDF
    object at all. Lenient viewers recover from that and render the file
    normally, which is exactly why it survived a visual check - but a strict
    parser rejects the whole document.
    """
    try:
        from reportlab.pdfbase.pdfdoc import PDFString
        c._doc.Catalog.Lang = PDFString("en-US")
    except Exception:
        pass


def line_field(c, x, y, w, label, hint=""):
    """A labelled rule to write on."""
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica-Bold", 7)
    c.drawString(x, y + 13, label.upper())
    if hint:
        c.setFont("Helvetica", 6.6)
        c.setFillColorRGB(0.55, 0.50, 0.50)
        c.drawRightString(x + w, y + 13, hint)
    c.setStrokeColorRGB(*RULE)
    c.setLineWidth(0.7)
    c.line(x, y, x + w, y)


def box(c, x, y, w, h, title, note=""):
    c.setStrokeColorRGB(*RULE)
    c.setLineWidth(0.7)
    c.rect(x, y - h, w, h, stroke=1, fill=0)
    c.setFillColorRGB(*INK)
    c.setFont("Helvetica-Bold", 7.6)
    c.drawString(x + 8, y - 13, title.upper())
    if note:
        c.setFillColorRGB(0.55, 0.50, 0.50)
        c.setFont("Helvetica", 7)
        c.drawString(x + 8, y - 24, note)
    # faint writing rules inside
    c.setStrokeColorRGB(0.90, 0.86, 0.86)
    c.setLineWidth(0.4)
    start = y - (34 if note else 26)
    row = 17
    n = int((start - (y - h) - 6) // row)
    for i in range(n):
        yy = start - i * row
        c.line(x + 8, yy, x + w - 8, yy)


def main():
    c = canvas.Canvas(str(OUT), pagesize=LETTER, invariant=1)
    c.setTitle("BP Central - Blood Pressure Summary for an Appointment")
    c.setAuthor("Anvil Road LLC")
    c.setSubject("One-page summary sheet for taking home blood pressure readings to an appointment")
    set_lang(c)

    left, right = M, W - M
    full = right - left

    # header
    c.setFillColorRGB(*BRAND)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(left, H - M, "BP CENTRAL")
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 9)
    c.drawRightString(right, H - M, "bptrack.app")
    c.setFillColorRGB(*INK)
    c.setFont("Times-Bold", 23)
    c.drawString(left, H - M - 30, "My Blood Pressure Summary")
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 9.5)
    c.drawString(left, H - M - 46,
                 "One page to take to an appointment. Fill it in from your log before you go.")

    y = H - M - 74

    # 1. the set
    c.setFillColorRGB(*BRAND)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(left, y, "1.  THE SET OF READINGS")
    y -= 22
    col = (full - 16) / 2
    line_field(c, left, y, col, "Name")
    line_field(c, left + col + 16, y, col, "Date of this appointment")
    y -= 34
    line_field(c, left, y, col, "Readings taken from", "first date")
    line_field(c, left + col + 16, y, col, "to", "last date")
    y -= 34
    third = (full - 32) / 3
    line_field(c, left, y, third, "How many readings")
    line_field(c, left + third + 16, y, third, "Over how many days")
    line_field(c, left + (third + 16) * 2, y, third, "Which arm")

    # 2. averages
    y -= 40
    c.setFillColorRGB(*BRAND)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(left, y, "2.  MY AVERAGES")
    y -= 12
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 7.4)
    c.drawString(left, y, "Average every reading in the set. Top numbers and bottom numbers "
                          "separately, never the two together.")
    y -= 20
    bh = 54
    c.setFillColorRGB(*TINT)
    c.rect(left, y - bh, full, bh, stroke=0, fill=1)
    q = (full - 32) / 2
    c.setFillColorRGB(*INK)
    c.setFont("Helvetica-Bold", 7)
    c.drawString(left + 12, y - 16, "AVERAGE TOP NUMBER (SYSTOLIC)")
    c.drawString(left + 12 + q + 16, y - 16, "AVERAGE BOTTOM NUMBER (DIASTOLIC)")
    c.setStrokeColorRGB(*RULE)
    c.setLineWidth(0.8)
    c.line(left + 12, y - 40, left + 12 + q - 24, y - 40)
    c.line(left + 12 + q + 16, y - 40, left + 12 + q + 16 + q - 24, y - 40)
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 8)
    c.drawString(left + 12 + q - 20, y - 40, "mmHg")
    c.drawString(left + 12 + q + 16 + q - 20, y - 40, "mmHg")
    y -= bh + 8
    c.setFillColorRGB(0.55, 0.50, 0.50)
    c.setFont("Helvetica", 6.8)
    c.drawString(left, y, "Optional, if you kept morning and evening apart: "
                          "morning ______ / ______      evening ______ / ______")

    # 3. equipment
    y -= 26
    c.setFillColorRGB(*BRAND)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(left, y, "3.  WHAT I MEASURED WITH")
    y -= 30
    line_field(c, left, y, col, "Monitor make and model")
    line_field(c, left + col + 16, y, col, "Cuff size used")
    y -= 34
    line_field(c, left, y, col, "My upper arm measurement", "optional")
    line_field(c, left + col + 16, y, col, "Anything unusual during the set")

    # 4 and 5: the blank halves that actually get used
    y -= 32
    bx = (full - 16) / 2
    BOX_H = 232
    box(c, left, y, bx, BOX_H, "4.  Questions I want to ask",
        "Write these before you go. They are the first thing forgotten.")
    box(c, left + bx + 16, y, bx, BOX_H, "5.  What I was told to do next",
        "Fill in during or right after the appointment.")

    # footer
    fy = y - BOX_H - 22
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 6.6)
    c.drawString(left, fy, PROTOCOL)
    c.drawString(left, fy - 9, DISCLAIM)
    c.setFillColorRGB(*BRAND)
    c.setFont("Helvetica-Bold", 7.6)
    c.drawString(left, fy - 22,
                 "Need the averages worked out? bptrack.app/blood-pressure-average-calculator does it "
                 "in your browser, free.")

    c.showPage()
    c.save()
    print("wrote", OUT, os.path.getsize(OUT), "bytes")


if __name__ == "__main__":
    main()
