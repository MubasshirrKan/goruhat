from PIL import Image
import glob
import sys

for file in glob.glob("public/cattle/*.png"):
    try:
        img = Image.open(file)
        img = img.convert("RGBA")
        datas = img.getdata()
        newData = []
        for item in datas:
            # Assuming pure white or very close to white background
            if item[0] >= 240 and item[1] >= 240 and item[2] >= 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
        img.putdata(newData)
        img.save(file, "PNG")
        print(f"Processed {file}")
    except Exception as e:
        print(f"Error on {file}: {e}")
