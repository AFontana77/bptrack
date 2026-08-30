"""
Builds public/bp-central-blood-pressure-log.pdf.

WHY THIS SCRIPT EXISTS
The previous PDF was hand-authored: 3KB of raw PDF operators with no source.
Nobody could change a column without rewriting the file by hand, so nobody did.

WHAT CHANGED AT M2.2, AND WHY
The old sheet was 22 undifferentiated rows. Two things said that was wrong:

  1. The SERP for "printable blood pressure chart" (2,400/mo) is almost entirely
     day-and-session diaries: heart.org "My Blood Pressure Log", BHF "Blood
     pressure chart and diary", MSKCC "Blood Pressure and Pulse Log". People
     printing these want a structure, not a blank grid.

  2. The site already cites the AHA/AMA joint statement protocol - two readings
     a minute apart, morning and evening, seven days - on the calculator and
     the starter kit. A log sheet that ignored the protocol the rest of the
     site teaches was the odd one out.

So page 1 is that protocol, printed: 7 days x (2 morning, 2 evening) = 28
readings, which is exactly the "fuller picture" figure the site quotes.

Page 2 is deliberately free-form. Some people are given a different routine by
their doctor, and a sheet that only supports one protocol would be telling them
their doctor is wrong. The site says "if your doctor asked for something
different, do theirs" - page 2 is that sentence as paper.

CONSTRAINTS
  - Black and white must stay useful. Colour is accent only; every rule, label
    and box still reads on a mono laser printer.
  - Writing space over density. Rows are 20pt, which is comfortable with a
    ballpoint. Cramming in more rows would beat the purpose.
  - No medical overclaim. The sheet records; it does not interpret. There is no
    range chart on it, on purpose - that lives at /blood-pressure-chart, and
    printing categories next to blank rows invites self-diagnosis.
  - Base-14 fonts only, so the file stays small and prints anywhere.

Run:  py -3.11 tools/build_log_pdf.py
"""
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.units import inch
from reportlab.pdfgen import canvas
from pathlib import Path

OUT = Path(__file__).resolve().parents[1] / "public" / "bp-central-blood-pressure-log.pdf"

W, H = LETTER
M = 0.62 * inch                     # margin
BRAND = (0.635, 0.020, 0.098)       # #A20519
INK = (0.10, 0.055, 0.055)
GREY = (0.40, 0.35, 0.35)
RULE = (0.78, 0.72, 0.72)
TINT = (0.973, 0.941, 0.937)        # very light warm, prints as near-white

PREP = [
    "No coffee, exercise or smoking for 30 minutes first.",
    "Empty your bladder.",
    "Sit still for 5 minutes, back supported, feet flat, legs uncrossed.",
    "Cuff on bare skin, just above the bend of your elbow, arm resting on a table.",
    "Do not talk while it runs. Take 2 readings at least 1 minute apart.",
]
SOURCE = ("Preparation steps: American Heart Association. Measurement of Blood Pressure in "
          "Humans. Hypertension. 2019;73(5):e35-e66.")
PROTOCOL = ("Routine: American Heart Association and American Medical Association. "
            "Self-Measured Blood Pressure Monitoring at Home. Circulation. 2020;142(4):e42-e63.")
DISCLAIM = ("This sheet is for recording readings. It is not medical advice and it does not "
            "diagnose anything. Talk to your doctor about your numbers.")


def header(c, title, sub):
    c.setFillColorRGB(*BRAND)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(M, H - M, "BP CENTRAL")
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 9)
    c.drawRightString(W - M, H - M, "bptrack.app")
    c.setFillColorRGB(*INK)
    c.setFont("Times-Bold", 23)
    c.drawString(M, H - M - 30, title)
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 9.5)
    c.drawString(M, H - M - 46, sub)
    return H - M - 62


def prep_box(c, y):
    h = 14 + len(PREP) * 11.5
    c.setFillColorRGB(*TINT)
    c.rect(M, y - h, W - 2 * M, h, stroke=0, fill=1)
    c.setFillColorRGB(*INK)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(M + 10, y - 13, "BEFORE YOU MEASURE")
    c.setFont("Helvetica", 8.5)
    c.setFillColorRGB(0.24, 0.20, 0.20)
    for i, line in enumerate(PREP):
        c.drawString(M + 10, y - 26 - i * 11.5, "–  " + line)   # en dash: present in StandardEncoding
    return y - h - 12


def footer(c, y, cta):
    c.setFillColorRGB(*GREY)
    c.setFont("Helvetica", 6.6)
    for i, line in enumerate([SOURCE, PROTOCOL, DISCLAIM]):
        c.drawString(M, y - i * 9, line)
    c.setFillColorRGB(*BRAND)
    c.setFont("Helvetica-Bold", 7.6)
    c.drawString(M, y - 3 * 9 - 3, cta)


def page_protocol(c):
    """7 days x 4 readings. The routine the rest of the site teaches."""
    y = header(c, "7-Day Blood Pressure Record",
               "Two readings each morning and each evening, for seven days. That is the set your doctor can use.")
    y = prep_box(c, y)

    left = M
    right = W - M
    # column x positions
    cols = [left, left + 62, left + 132, left + 196, left + 260, left + 322, right]
    labels = ["DAY / DATE", "WHEN", "TOP (SYS)", "BOTTOM (DIA)", "PULSE", "NOTES"]

    # header band
    c.setFillColorRGB(*BRAND)
    c.rect(left, y - 15, right - left, 15, stroke=0, fill=1)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Helvetica-Bold", 7.3)
    for i, lab in enumerate(labels):
        c.drawString(cols[i] + 5, y - 10.5, lab)
    y -= 15

    # Reserve the footer block first, then divide what is left between the 28
    # rows. The first draft hard-coded 19pt rows and pushed the source, the
    # disclaimer and the CTA clean off the bottom of the page.
    FOOTER_BLOCK = 92.0
    row_h = (y - M - FOOTER_BLOCK) / 28.0
    sessions = ["Morning 1", "Morning 2", "Evening 1", "Evening 2"]
    for day in range(7):
        block_top = y
        for s, name in enumerate(sessions):
            c.setStrokeColorRGB(*RULE)
            c.setLineWidth(0.5)
            c.rect(left, y - row_h, right - left, row_h, stroke=1, fill=0)
            for x in cols[1:-1]:
                c.line(x, y - row_h, x, y)
            c.setFillColorRGB(*GREY)
            c.setFont("Helvetica", 7.4)
            c.drawString(cols[1] + 5, y - row_h + 6.5, name)
            y -= row_h
        # day label + a heavier rule under each day so the blocks read apart
        c.setFillColorRGB(*INK)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(left + 6, block_top - row_h * 2 + 4, "Day %d" % (day + 1))
        c.setStrokeColorRGB(*INK)
        c.setLineWidth(1.0)
        c.line(left, y, right, y)

    # averages: where the paper sheet hands off to the calculator
    y -= 12
    c.setFillColorRGB(*TINT)
    c.rect(left, y - 28, right - left, 28, stroke=0, fill=1)
    c.setFillColorRGB(*INK)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(left + 10, y - 12, "WHEN THE WEEK IS DONE")
    c.setFont("Helvetica", 8.5)
    c.setFillColorRGB(0.24, 0.20, 0.20)
    c.drawString(left + 10, y - 22,
                 "Average every reading above, top numbers and bottom numbers separately. "
                 "Average top ______ / Average bottom ______")
    footer(c, y - 40, "No maths? bptrack.app/blood-pressure-average-calculator works it out in your browser, free.")


def page_freeform(c):
    """For anyone whose doctor asked for a different routine."""
    y = header(c, "Blood Pressure Log",
               "A blank sheet, for a routine of your own. Write down every reading, not just the ones you like.")
    left, right = M, W - M
    cols = [left, left + 74, left + 140, left + 196, left + 254, left + 312, right]
    labels = ["DATE", "TIME", "ARM", "TOP (SYS)", "BOTTOM (DIA)", "PULSE / NOTES"]
    c.setFillColorRGB(*BRAND)
    c.rect(left, y - 15, right - left, 15, stroke=0, fill=1)
    c.setFillColorRGB(1, 1, 1)
    c.setFont("Helvetica-Bold", 7.3)
    for i, lab in enumerate(labels):
        c.drawString(cols[i] + 5, y - 10.5, lab)
    y -= 15
    row_h = 20.5
    rows = int((y - M - 62) // row_h)
    c.setStrokeColorRGB(*RULE)
    c.setLineWidth(0.5)
    for _ in range(rows):
        c.rect(left, y - row_h, right - left, row_h, stroke=1, fill=0)
        for x in cols[1:-1]:
            c.line(x, y - row_h, x, y)
        y -= row_h
    footer(c, y - 16, "Tired of paper? BP Central keeps the same log on your phone and works out your averages. bptrack.app")


def main():
    # invariant=1 fixes the creation timestamp and document id, so re-running
    # this script produces a byte-identical file. Without it reportlab stamps
    # "now" and every regeneration is a spurious binary diff, which trains
    # people to stop reading changes to it. It must be set here, at
    # construction; setting it on the doc afterwards is too late.
    c = canvas.Canvas(str(OUT), pagesize=LETTER, invariant=1)
    c.setTitle("BP Central - Blood Pressure Log")
    c.setAuthor("Anvil Road LLC")
    c.setSubject("Printable blood pressure log and 7-day record sheet")
    # Document language, so a screen reader in a PDF viewer is not left
    # guessing. reportlab exposes this on the doc catalogue rather than the
    # canvas; c.setLang() does not exist in 5.0.
    try:
        c._doc.Catalog.Lang = "en-US"
    except Exception:
        pass
    page_protocol(c)
    c.showPage()
    page_freeform(c)
    c.showPage()
    c.save()
    print("wrote", OUT, OUT.stat().st_size, "bytes")


if __name__ == "__main__":
    main()
