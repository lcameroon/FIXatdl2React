import parser from 'xml-js';

import { Atdl } from '../model/atdl.d';

// To parse this data:
//
//   import { Convert } from "./model.utils";
//
//   const atdl = Convert.toAtdl(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
export class Convert {
  public static toAtdl(json: string): Atdl {
    return cast(JSON.parse(json), ref('Atdl'));
  }

  public static atdlToJson(value: Atdl): string {
    return JSON.stringify(uncast(value, ref('Atdl')), null, 2);
  }

  public static toJson(xml: string): string {
    xml = xml.replace(/(xsi:|lay:|val:)/g, '');
    return parser.xml2json(xml, { compact: true, spaces: 2 });
  }
}

function invalidValue(typ: any, val: any): never {
  throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`);
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(cases, val);
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue('array', val);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue('Date', val);
    }
    return d;
  }

  function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
    if (val === null || typeof val !== 'object' || Array.isArray(val)) {
      return invalidValue('object', val);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
      result[prop.key] = transform(v, prop.typ, getProps);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps);
      }
    });
    return result;
  }

  if (typ === 'any') return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val);
  }
  if (typ === false) return invalidValue(typ, val);
  while (typeof typ === 'object' && typ.ref !== undefined) {
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === 'object') {
    return typ.hasOwnProperty('unionMembers')
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty('arrayItems')
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty('props')
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== 'number') return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function arrItems(typ: any) {
  return { arrayItems: typ };
}

function unionMembers(...typs: any[]) {
  return { unionMembers: typs };
}

function obj(props: any[], additional: any) {
  return { props, additional };
}

// function m(additional: any) {
//   return { props: [], additional };
// }

function ref(name: string) {
  return { ref: name };
}

const typeMap: any = {
  Atdl: obj(
    [
      {
        json: 'Strategies',
        js: 'Strategies',
        typ: unionMembers(undefined, ref('Strategies')),
      },
    ],
    false
  ),
  Strategies: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('StrategiesAttributes')),
      },
      {
        json: 'Strategy',
        js: 'Strategy',
        typ: unionMembers(undefined, arrItems(ref('Strategy'))),
      },
    ],
    false
  ),
  Strategy: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('StrategyAttributes')),
      },
      { json: 'Regions', js: 'Regions', typ: unionMembers(undefined, ref('Regions')) },
      {
        json: 'Parameter',
        js: 'Parameter',
        typ: unionMembers(
          undefined,
          unionMembers(arrItems(ref('ParameterElement')), ref('PurpleParameter'))
        ),
      },
      {
        json: 'StrategyLayout',
        js: 'StrategyLayout',
        typ: unionMembers(undefined, ref('StrategyLayout')),
      },
      {
        json: 'StrategyEdit',
        js: 'StrategyEdit',
        typ: unionMembers(undefined, ref('StrategyEdit')),
      },
    ],
    false
  ),
  ParameterElement: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('PurpleAttributes')),
      },
      {
        json: 'EnumPair',
        js: 'EnumPair',
        typ: unionMembers(undefined, arrItems(ref('EnumPair'))),
      },
    ],
    false
  ),
  EnumPair: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('EnumPairAttributes')),
      },
    ],
    false
  ),
  EnumPairAttributes: obj(
    [
      { json: 'wireValue', js: 'wireValue', typ: unionMembers(undefined, '') },
      { json: 'enumID', js: 'enumID', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  PurpleAttributes: obj(
    [
      { json: 'type', js: 'type', typ: unionMembers(undefined, '') },
      { json: 'name', js: 'name', typ: unionMembers(undefined, '') },
      { json: 'fixTag', js: 'fixTag', typ: unionMembers(undefined, '') },
      { json: 'use', js: 'use', typ: unionMembers(undefined, ref('Use')) },
      {
        json: 'mutableOnCxlRpl',
        js: 'mutableOnCxlRpl',
        typ: unionMembers(undefined, ''),
      },
      { json: 'revertOnCxlRpl', js: 'revertOnCxlRpl', typ: unionMembers(undefined, '') },
      { json: 'precision', js: 'precision', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  PurpleParameter: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('FluffyAttributes')),
      },
    ],
    false
  ),
  FluffyAttributes: obj(
    [
      { json: 'fixTag', js: 'fixTag', typ: unionMembers(undefined, '') },
      { json: 'name', js: 'name', typ: unionMembers(undefined, '') },
      { json: 'use', js: 'use', typ: unionMembers(undefined, ref('Use')) },
      { json: 'type', js: 'type', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  Regions: obj(
    [
      {
        json: 'Region',
        js: 'Region',
        typ: unionMembers(undefined, arrItems(ref('Region'))),
      },
    ],
    false
  ),
  Region: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('RegionAttributes')),
      },
    ],
    false
  ),
  RegionAttributes: obj(
    [
      { json: 'name', js: 'name', typ: unionMembers(undefined, '') },
      { json: 'inclusion', js: 'inclusion', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  StrategyEdit: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('StrategyEditAttributes')),
      },
      { json: 'Edit', js: 'Edit', typ: unionMembers(undefined, ref('StrategyEditEdit')) },
    ],
    false
  ),
  StrategyEditEdit: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('StickyAttributes')),
      },
      {
        json: 'Edit',
        js: 'Edit',
        typ: unionMembers(undefined, arrItems(ref('EditElement'))),
      },
    ],
    false
  ),
  EditElement: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('TentacledAttributes')),
      },
    ],
    false
  ),
  TentacledAttributes: obj(
    [
      { json: 'field', js: 'field', typ: unionMembers(undefined, '') },
      { json: 'operator', js: 'operator', typ: unionMembers(undefined, '') },
      { json: 'field2', js: 'field2', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  StickyAttributes: obj(
    [{ json: 'logicOperator', js: 'logicOperator', typ: unionMembers(undefined, '') }],
    false
  ),
  StrategyEditAttributes: obj(
    [{ json: 'errorMessage', js: 'errorMessage', typ: unionMembers(undefined, '') }],
    false
  ),
  StrategyLayout: obj(
    [
      {
        json: 'StrategyPanel',
        js: 'StrategyPanel',
        typ: unionMembers(undefined, ref('StrategyLayoutStrategyPanel')),
      },
    ],
    false
  ),
  StrategyLayoutStrategyPanel: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('StrategyPanelAttributes')),
      },
      {
        json: 'StrategyPanel',
        js: 'StrategyPanel',
        typ: unionMembers(undefined, ref('StrategyPanelStrategyPanel')),
      },
    ],
    false
  ),
  StrategyPanelStrategyPanel: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('StrategyPanelAttributes')),
      },
      {
        json: 'Control',
        js: 'Control',
        typ: unionMembers(undefined, arrItems(ref('Control'))),
      },
    ],
    false
  ),
  Control: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('ControlAttributes')),
      },
      {
        json: 'ListItem',
        js: 'ListItem',
        typ: unionMembers(undefined, arrItems(ref('ListItem'))),
      },
    ],
    false
  ),
  ListItem: obj(
    [
      {
        json: '_attributes',
        js: '_attributes',
        typ: unionMembers(undefined, ref('ListItemAttributes')),
      },
    ],
    false
  ),
  ListItemAttributes: obj(
    [
      { json: 'enumID', js: 'enumID', typ: unionMembers(undefined, '') },
      { json: 'uiRep', js: 'uiRep', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  ControlAttributes: obj(
    [
      { json: 'type', js: 'type', typ: unionMembers(undefined, '') },
      { json: 'ID', js: 'ID', typ: unionMembers(undefined, '') },
      { json: 'parameterRef', js: 'parameterRef', typ: unionMembers(undefined, '') },
      { json: 'tooltip', js: 'tooltip', typ: unionMembers(undefined, '') },
      { json: 'label', js: 'label', typ: unionMembers(undefined, '') },
      { json: 'initValue', js: 'initValue', typ: unionMembers(undefined, '') },
      { json: 'orientation', js: 'orientation', typ: unionMembers(undefined, '') },
      { json: 'innerIncrement', js: 'innerIncrement', typ: unionMembers(undefined, '') },
      { json: 'outerIncrement', js: 'outerIncrement', typ: unionMembers(undefined, '') },
      { json: 'increment', js: 'increment', typ: unionMembers(undefined, '') },
      { json: 'initPolicy', js: 'initPolicy', typ: unionMembers(undefined, '') },
      { json: 'initFixField', js: 'initFixField', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  StrategyPanelAttributes: obj(
    [
      { json: 'orientation', js: 'orientation', typ: unionMembers(undefined, '') },
      { json: 'border', js: 'border', typ: unionMembers(undefined, '') },
      { json: 'collapsed', js: 'collapsed', typ: unionMembers(undefined, '') },
      { json: 'collapsible', js: 'collapsible', typ: unionMembers(undefined, '') },
      { json: 'title', js: 'title', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  StrategyAttributes: obj(
    [
      { json: 'name', js: 'name', typ: unionMembers(undefined, '') },
      { json: 'uiRep', js: 'uiRep', typ: unionMembers(undefined, '') },
      { json: 'wireValue', js: 'wireValue', typ: unionMembers(undefined, '') },
      { json: 'providerID', js: 'providerID', typ: unionMembers(undefined, '') },
      { json: 'version', js: 'version', typ: unionMembers(undefined, '') },
      { json: 'fixMsgType', js: 'fixMsgType', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  StrategiesAttributes: obj(
    [
      { json: 'xmlns:lay', js: 'xmlns:lay', typ: unionMembers(undefined, '') },
      { json: 'xmlns:val', js: 'xmlns:val', typ: unionMembers(undefined, '') },
      { json: 'xmlns:flow', js: 'xmlns:flow', typ: unionMembers(undefined, '') },
      { json: 'xmlns:xsi', js: 'xmlns:xsi', typ: unionMembers(undefined, '') },
      {
        json: 'strategyIdentifierTag',
        js: 'strategyIdentifierTag',
        typ: unionMembers(undefined, ''),
      },
      {
        json: 'versionIdentifierTag',
        js: 'versionIdentifierTag',
        typ: unionMembers(undefined, ''),
      },
      {
        json: 'changeStrategyOnCxlRpl',
        js: 'changeStrategyOnCxlRpl',
        typ: unionMembers(undefined, ''),
      },
      { json: 'xmlns', js: 'xmlns', typ: unionMembers(undefined, '') },
      { json: 'schemaLocation', js: 'schemaLocation', typ: unionMembers(undefined, '') },
    ],
    false
  ),
  Use: ['optional', 'required'],
};
