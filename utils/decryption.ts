import { UpdatedComic } from "@/types/dmzj.interface";
import protobuf, { Reader, Type } from "protobufjs";
import { ITSOverwrite } from "ts-type/lib/type/record";
import dmzjProto from "./dmzjproto.json";

export const enum EnumResponseTypeKey {
  Root = "Root",
  updatedComicListResponse = "updatedComicListResponse",
}

const _cache = new Map<EnumResponseTypeKey, unknown>();

type IKeyOfMap<T extends Map<any, any>> = T extends Map<infer K, any>
  ? K
  : never;
type IValueOfMap<T extends Map<any, any>> = T extends Map<any, infer V>
  ? V
  : never;

function _cacheGet<
  V extends IValueOfMap<typeof _cache>,
  K extends IKeyOfMap<typeof _cache> = IKeyOfMap<typeof _cache>
>(key: K, fn?: V | ((key: K) => V)): V {
  let value = _cache.get(key);

  value ??= (() => {
    let _new: V;

    if (typeof fn === "function") {
      // @ts-ignore
      _new = fn(key);
    } else {
      // @ts-ignore
      _new = fn;
    }

    if (_new !== value) {
      return _new;
    }
  })();

  return value as V;
}

export function _lookupType<T extends Type>(path: EnumResponseTypeKey) {
  return _cacheGet(path, (path) => {
    return lookupTypeRoot().lookupType(path);
  });
}

export function lookupTypeRoot() {
  return _cacheGet(EnumResponseTypeKey.Root, () => {
    return protobuf.Root.fromJSON(dmzjProto);
  });
}

export function lookupTypeUpdatedComicResponse() {
  return _lookupType(
    EnumResponseTypeKey.updatedComicListResponse
  ) as any as ITSOverwrite<
    Type,
    {
      decode(reader: Reader | Uint8Array, length?: number): UpdatedComic;
    }
  >;
}
