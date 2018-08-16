System.register(["scripts/src/lib/excalibur.js"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || (function () {
        var extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var excalibur_js_1, excalibur_js_2, excalibur_js_3, excalibur_js_4, excalibur_js_5, excalibur_js_6, excalibur_js_7, TiledMapFormat, TiledResource, parseJsonMap, decompressors;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (excalibur_js_1_1) {
                excalibur_js_1 = excalibur_js_1_1;
                excalibur_js_2 = excalibur_js_1_1;
                excalibur_js_3 = excalibur_js_1_1;
                excalibur_js_4 = excalibur_js_1_1;
                excalibur_js_5 = excalibur_js_1_1;
                excalibur_js_6 = excalibur_js_1_1;
                excalibur_js_7 = excalibur_js_1_1;
            }
        ],
        execute: function () {
            (function (TiledMapFormat) {
                TiledMapFormat[TiledMapFormat["TMX"] = 0] = "TMX";
                TiledMapFormat[TiledMapFormat["JSON"] = 1] = "JSON";
            })(TiledMapFormat || (TiledMapFormat = {}));
            exports_1("TiledMapFormat", TiledMapFormat);
            TiledResource = /** @class */ (function (_super) {
                __extends(TiledResource, _super);
                function TiledResource(path, mapFormat) {
                    if (mapFormat === void 0) { mapFormat = TiledMapFormat.JSON; }
                    var _this = this;
                    switch (mapFormat) {
                        case TiledMapFormat.JSON:
                            _this = _super.call(this, path, "json") || this;
                            break;
                        default:
                            throw "The format " + mapFormat + " is not currently supported. Please export Tiled map as JSON.";
                    }
                    _this.mapFormat = mapFormat;
                    _this.imagePathAccessor = _this.externalTilesetPathAccessor = function (p, tileset) {
                        // Use absolute path if specified
                        if (p.indexOf('/') === 0) {
                            return p;
                        }
                        // Load relative to map path
                        var pp = path.split('/');
                        var relPath = pp.concat([]);
                        if (pp.length > 0) {
                            // remove file part of path
                            relPath.splice(-1);
                        }
                        relPath.push(p);
                        return relPath.join('/');
                    };
                    return _this;
                }
                TiledResource.prototype.load = function () {
                    var _this = this;
                    var p = new excalibur_js_2.default();
                    _super.prototype.load.call(this).then(function (map) {
                        var promises = [];
                        // Loop through loaded tileset data
                        // If we find an image property, then
                        // load the image and sprite
                        // If we find a source property, then
                        // load the tileset data, merge it with
                        // existing data, and load the image and sprite
                        _this.data.tilesets.forEach(function (ts) {
                            if (ts.source) {
                                var tileset = new excalibur_js_1.default(_this.externalTilesetPathAccessor(ts.source, ts), "json");
                                promises.push(tileset.load().then(function (external) {
                                    Object.assign(ts, external);
                                }));
                            }
                        });
                        // wait or immediately resolve pending promises
                        // for external tilesets
                        excalibur_js_2.default.join.apply(_this, promises).then(function () {
                            // clear pending promises
                            promises = [];
                            // retrieve images from tilesets and create textures
                            _this.data.tilesets.forEach(function (ts) {
                                var tx = new excalibur_js_3.default(_this.imagePathAccessor(ts.image, ts));
                                ts.imageTexture = tx;
                                promises.push(tx.load());
                                excalibur_js_7.default.getInstance().debug("[Tiled] Loading associated tileset: " + ts.image);
                            });
                            excalibur_js_2.default.join.apply(_this, promises).then(function () {
                                p.resolve(map);
                            }, function (value) {
                                p.reject(value);
                            });
                        }, function (value) {
                            p.reject(value);
                        });
                    });
                    return p;
                };
                TiledResource.prototype.processData = function (data) {
                    if (typeof data !== "object") {
                        throw "Tiled map resource " + this.path + " is not the correct content type";
                    }
                    if (data === void 0) {
                        throw "Tiled map resource " + this.path + " is empty";
                    }
                    switch (this.mapFormat) {
                        case TiledMapFormat.JSON:
                            return parseJsonMap(data);
                    }
                };
                TiledResource.prototype.getTilesetForTile = function (gid) {
                    for (var i = this.data.tilesets.length - 1; i >= 0; i--) {
                        var ts = this.data.tilesets[i];
                        if (ts.firstgid <= gid) {
                            return ts;
                        }
                    }
                    return null;
                };
                TiledResource.prototype.getTileMap = function () {
                    var map = new excalibur_js_4.default(0, 0, this.data.tilewidth, this.data.tileheight, this.data.height, this.data.width);
                    // register sprite sheets for each tileset in map
                    for (var _i = 0, _a = this.data.tilesets; _i < _a.length; _i++) {
                        var ts = _a[_i];
                        var cols = Math.floor(ts.imagewidth / ts.tilewidth);
                        var rows = Math.floor(ts.imageheight / ts.tileheight);
                        var ss = new excalibur_js_6.default(ts.imageTexture, cols, rows, ts.tilewidth, ts.tileheight);
                        map.registerSpriteSheet(ts.firstgid.toString(), ss);
                    }
                    for (var _b = 0, _c = this.data.layers; _b < _c.length; _b++) {
                        var layer = _c[_b];
                        if (layer.type === "tilelayer") {
                            for (var i = 0; i < layer.data.length; i++) {
                                var gid = layer.data[i];
                                if (gid !== 0) {
                                    var ts = this.getTilesetForTile(gid);
                                    map.data[i].sprites.push(new excalibur_js_5.default(ts.firstgid.toString(), gid - ts.firstgid));
                                }
                            }
                        }
                    }
                    return map;
                };
                return TiledResource;
            }(excalibur_js_1.default));
            exports_1("default", TiledResource);
            /**
             * Handles parsing of JSON tiled data
             */
            parseJsonMap = function (data) {
                // Decompress layers
                if (data.layers) {
                    for (var _i = 0, _a = data.layers; _i < _a.length; _i++) {
                        var layer = _a[_i];
                        if (typeof layer.data === "string") {
                            if (layer.encoding === "base64") {
                                layer.data = decompressors.decompressBase64(layer.data, layer.encoding, layer.compression || "");
                            }
                        }
                        else {
                            layer.data = decompressors.decompressCsv(layer.data);
                        }
                    }
                }
                return data;
            };
            /**
             * Decompression implementations
             */
            decompressors = {
                /**
                 * Simplest (passes data through since it's uncompressed)
                 */
                decompressCsv: function (data) {
                    return data;
                },
                /**
                 * Uses base64.js implementation to decode string into byte array
                 * and then converts (with/without compression) to array of numbers
                 */
                decompressBase64: function (b64, encoding, compression) {
                    var i, j, l, tmp, placeHolders, arr;
                    if (b64.length % 4 > 0) {
                        throw new Error('Invalid string. Length must be a multiple of 4');
                    }
                    var Arr = (typeof Uint8Array !== 'undefined')
                        ? Uint8Array
                        : Array;
                    var PLUS = '+'.charCodeAt(0);
                    var SLASH = '/'.charCodeAt(0);
                    var NUMBER = '0'.charCodeAt(0);
                    var LOWER = 'a'.charCodeAt(0);
                    var UPPER = 'A'.charCodeAt(0);
                    var PLUS_URL_SAFE = '-'.charCodeAt(0);
                    var SLASH_URL_SAFE = '_'.charCodeAt(0);
                    function decode(elt) {
                        var code = elt.charCodeAt(0);
                        if (code === PLUS || code === PLUS_URL_SAFE)
                            return 62; // '+'
                        if (code === SLASH || code === SLASH_URL_SAFE)
                            return 63; // '/'
                        if (code < NUMBER)
                            return -1; // no match
                        if (code < NUMBER + 10)
                            return code - NUMBER + 26 + 26;
                        if (code < UPPER + 26)
                            return code - UPPER;
                        if (code < LOWER + 26)
                            return code - LOWER + 26;
                    }
                    // the number of equal signs (place holders)
                    // if there are two placeholders, than the two characters before it
                    // represent one byte
                    // if there is only one, then the three characters before it represent 2 bytes
                    // this is just a cheap hack to not do indexOf twice
                    var len = b64.length;
                    placeHolders = b64.charAt(len - 2) === '=' ? 2 : b64.charAt(len - 1) === '=' ? 1 : 0;
                    // base64 is 4/3 + up to two characters of the original data
                    arr = new Arr(b64.length * 3 / 4 - placeHolders);
                    // if there are placeholders, only get up to the last complete 4 chars
                    l = placeHolders > 0 ? b64.length - 4 : b64.length;
                    var L = 0;
                    function push(v) {
                        arr[L++] = v;
                    }
                    for (i = 0, j = 0; i < l; i += 4, j += 3) {
                        tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3));
                        push((tmp & 0xFF0000) >> 16);
                        push((tmp & 0xFF00) >> 8);
                        push(tmp & 0xFF);
                    }
                    if (placeHolders === 2) {
                        tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4);
                        push(tmp & 0xFF);
                    }
                    else if (placeHolders === 1) {
                        tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2);
                        push((tmp >> 8) & 0xFF);
                        push(tmp & 0xFF);
                    }
                    // // Byte array
                    // // handle compression
                    // if ("zlib" === compression || "gzip" === compression) {
                    //    arr = pako.inflate( arr );
                    // }
                    var toNumber = function (byteArray) {
                        var value = 0;
                        for (var i = byteArray.length - 1; i >= 0; i--) {
                            value = (value * 256) + byteArray[i] * 1;
                        }
                        return value;
                    };
                    var resultLen = arr.length / 4;
                    var result = new Array(resultLen);
                    for (i = 0; i < resultLen; i++) {
                        result[i] = toNumber(arr.slice(i * 4, i * 4 + 3));
                    }
                    return result;
                }
            };
        }
    };
});
//# sourceMappingURL=index.js.map