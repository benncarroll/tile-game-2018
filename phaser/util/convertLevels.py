import json, os

dir = os.fsencode("../levels")
print()


for filename in os.listdir(dir):
    if str(filename).endswith(".json'"):
        file=os.path.join(dir, filename)
        print(file)

        jstring = ""
        with open(file) as f:
            for l in f:
                jstring += l.strip()

        jfile = json.loads(jstring)




        ##### Begin conversion

        # Load phaser-friendly tileset into map file

        ts = [{
            'columns': 18,
            'firstgid': 1,
            'image': '..\/images\/tileset-main.gif',
            'imageheight': 288,
            'imagewidth': 288,
            'margin': 0,
            'name': 'main',
            'spacing': 0,
            'tilecount': 324,
            'tileheight': 16,
            'tilewidth': 16
          }, {
            'columns': 18,
            'firstgid': 257,
            'image': '..\/images\/tileset-alt.png',
            'imageheight': 256,
            'imagewidth': 256,
            'margin': 0,
            'name': 'alt',
            'spacing': 0,
            'tilecount': 256,
            'tileheight': 16,
            'tilewidth': 16
          }]
        if jfile['tilesets'] != ts:
            jfile['tilesets'] = ts
            print("Updated tileset.")


        # Replace key name
        # Add new ones into keys dict like so:
        # 'old_key_name' : 'new_key_name'

        keys = {'tileWidth':'tilewidth',
                'tileHeight': 'tileheight'}
        for key in keys:
            try:
                jfile[keys[key]] = jfile.pop(key)
                # if "key"
                print(key, "->", keys[key])
                pass
            except Exception as e:
                if type(e) == KeyError:
                    pass
                else:
                    raise
            pass

        try:
            with open(file, "w") as jsonFile:
                json.dump(jfile, jsonFile)
            pass
        except Exception as e:
            raise

        print()
        continue
    else:
        continue
