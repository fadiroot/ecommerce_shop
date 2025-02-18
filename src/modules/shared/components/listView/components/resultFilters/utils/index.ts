/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
export const escapeValue = (v: any) => {
  if (typeof v === 'boolean') {
    return Number(v);
  }
  if (typeof v === 'string') {
    return v.trim();
  }
  if (Array.isArray(v)) {
    return v.map((arr) => arr);
  }
  return v;
};

export const optionsParser = (
  search: string | any[],
  filters: { [x: string]: any },
  sort: { id?: any; order?: any },
  fieldSearchable: string[] | null = null
) => {
  const params = [];
  const parsedSearch: string[] = [];
  if (search && search.length) {
    if (fieldSearchable) {
      fieldSearchable.map((field: string, index: number) =>
        parsedSearch.push(`${field}=like:%${search}%&`)
      );
      params.push(parsedSearch.join('').slice(0, -1));
    }
  }
  if (filters && Object.keys(filters).length) {
    params.length = 0;
    const parsedFilters: string[] = [];
    Object.keys(filters).map((key) => {
      if (filters[key] !== undefined && filters[key] !== null) {
        if (filters[key] instanceof Array) {
          if (filters[key][0] instanceof Object) {
            const arr: any[] = [];
            Object.keys(filters[key]).forEach((pop) => {
              if (filters[key][pop] !== undefined && filters[key][pop] !== null) {
                const value = escapeValue(filters[key][pop].id);
                arr.push(value);
              }
            });
            parsedFilters.push(`${key}:${arr}&`);
          } else {
            const value = escapeValue(filters[key]);
            parsedFilters.push(`${key}:${value}&`);
          }
        } else {
          const value = escapeValue(filters[key]);
          parsedFilters.push(`${key}:${value}&`);
        }
      }
      return '';
    });
    params.push(`${parsedFilters.join('').slice(0, -1)}`);
  }
  if (sort && Object.keys(sort).length) {
    params.push(`sort_by=${sort.id}.${sort.order}`);
  }
  return params.length ? `&${params[0]}` : '';
};

export const cleanEmptyValues = (submitValues: { [s: string]: unknown } | ArrayLike<unknown>) => {
  const cleanedSubmitValues: { [s: string]: unknown } = {};
  for (const [fieldKey, fieldValue] of Object.entries(submitValues)) {
    if (Array.isArray(fieldValue) && fieldValue.length === 0) {
      if (fieldValue.length === 0) {
        continue;
      }
    }
    if (typeof fieldValue === typeof Object) {
      if (typeof fieldValue === 'object' && Object.keys(fieldValue as object).length === 0) {
        continue;
      }
    }
    if (typeof fieldValue === 'string' && fieldValue.trim() === '') {
      if (fieldValue.trim() === '') {
        continue;
      }
    }
    cleanedSubmitValues[fieldKey] = fieldValue;
  }
  return cleanedSubmitValues;
};
export const cleanUpdateData = (
  submitValues: any,
  initialValues: { [s: string]: unknown } | ArrayLike<unknown>
) => {
  const cleanedUpValues: { [s: string]: any } = {};
  const cleanedSubmitValues = cleanEmptyValues(submitValues);
  try {
    for (const [fieldKey, fieldValue] of Object.entries(initialValues)) {
      if (fieldValue instanceof Array) {
        if (fieldValue?.length === 0 && cleanedSubmitValues[fieldKey] !== undefined) {
          cleanedUpValues[fieldKey] = cleanedSubmitValues[fieldKey];
        }
        if (
          Array.isArray(cleanedSubmitValues[fieldKey]) &&
          //@ts-ignore

          cleanedSubmitValues[fieldKey]?.length > fieldValue?.length
        ) {
          cleanedUpValues[fieldKey] = cleanedSubmitValues[fieldKey];
        } else {
          for (let i = 0; i < fieldValue?.length; i++) {
            if (fieldValue[i]?.id !== (cleanedSubmitValues[fieldKey] as any[])?.[i]?.id) {
              cleanedUpValues[fieldKey] = cleanedSubmitValues[fieldKey];
              break;
            }
          }
        }
      } else if (typeof fieldValue === 'object') {
        if (
          (fieldValue as { id?: any })?.id !== (cleanedSubmitValues[fieldKey] as { id?: any })?.id
        ) {
          cleanedUpValues[fieldKey] = cleanedSubmitValues[fieldKey];
        }
      } else {
        if (cleanedSubmitValues[fieldKey] === undefined) {
          continue;
        }
        if (fieldValue !== cleanedSubmitValues[fieldKey]) {
          cleanedUpValues[fieldKey] = cleanedSubmitValues[fieldKey];
        }
      }
    }
  } catch (error) {
    return {};
  }

  return cleanedUpValues;
};

export const getTeacherClassesString = (classes: any[]) => {
  let classesStr = '';
  classes.forEach((teacherClass: { name: string }, index: number) => {
    classesStr += index === classes.length - 1 ? teacherClass.name : `${teacherClass.name},\n`;
  });
  return classesStr;
};

export function descendingComparator(
  a: { [x: string]: number },
  b: { [x: string]: number },
  orderBy: string | number
) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order: string, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

export const createFilterQuery = (columnsInfo: any[], values: Record<string, any>) => {
  let query = `{"and":[`;
  const includeString = '[';

  for (const column of columnsInfo) {
    if (values[column?.id] !== undefined) {
      switch (column?.type) {
        case 'number':
          if (query[query.length - 1] === '}') {
            query += ',';
          }
          query += `{"${column?.id}":{"eq":${values[column?.id]}}}`;
          break;
        case 'numberRange':
          if (query[query.length - 1] === '}') {
            query += ',';
          }
          if (values[column?.id]?.min && values[column?.id]?.max) {
            query += `{"${column?.id}":{"between":["${values[column?.id].min}","${
              values[column?.id].max
            }"]}}`;
          } else if (values[column?.id]?.min) {
            query += `{"${column?.id}":{"gte":"${values[column?.id].min}"}}`;
          } else if (values[column?.id]?.max) {
            query += `{"${column?.id}":{"lte":"${values[column?.id].max}"}}`;
          }
          break;
        case 'boolean':
          if (query[query.length - 1] === '}') {
            query += ',';
          }
          query += `{"${column?.id}":{"eq":${values[column?.id]}}}`;
          break;
        case 'multiSelect':
          if (values[column?.id]?.length !== 0) {
            if (column?.id === 'state') {
              if (query[query.length - 1] === '}') {
                query += ',';
              }
              query += `{"state_id":{"in":[${values[column?.id].map(
                (option: { id: any }) => option.id
              )}]}}`;
            }

            if (column?.id === 'locker') {
              if (query[query.length - 1] === '}') {
                query += ',';
              }
              query += `{"locker_id":{"in":[${values[column?.id].map(
                (option: { id: any }) => option.id
              )}]}}`;
            }
            if (column?.id === 'reduction_type') {
              if (query[query.length - 1] === '}') {
                query += ',';
              }
              query += `{"reduction_type_id":{"in":[${values[column?.id].map(
                (option: { id: any }) => option.id
              )}]}}`;
            }
            if (column?.id === 'role') {
              if (query[query.length - 1] === '}') {
                query += ',';
              }
              query += `{"role_id":{"in":[${values[column?.id].map(
                (option: { id: any }) => option.id
              )}]}}`;
            }
            if (column?.id === 'service') {
              if (query[query.length - 1] === '}') {
                query += ',';
              }
              query += `{"service_id":{"in":[${values[column?.id].map(
                (option: { id: any }) => option.id
              )}]}}`;
            }
            if (column?.id === 'payment_method') {
              if (query[query.length - 1] === '}') {
                query += ',';
              }
              query += `{"payment_method_id":{"in":[${values[column?.id].map(
                (option: { id: any }) => option.id
              )}]}}`;
            }
            if (column?.id === 'category') {
              if (query[query.length - 1] === '}') {
                query += ',';
              }
              query += `{"category_id":{"in":[${values[column?.id].map(
                (option: { id: any }) => option.id
              )}]}}`;
            }
            if (column?.id === 'bracket') {
              if (query[query.length - 1] === '}') {
                query += ',';
              }
              query += `{"bracket_id":{"in":[${values[column?.id].map(
                (option: { id: any }) => option.id
              )}]}}`;
            }
          }
          break;
        case 'monoSelect':
          if (column?.id === 'status') {
            if (query[query.length - 1] === '}') {
              query += ',';
            }
            query += `{"status": {"eq":"${values?.status}"}}`;
          }
          break;
        case 'dateRange':
        default:
          query += '';
      }
    }
  }

  query += `]}`;

  // Define the type of finalQuery explicitly
  const finalQuery: { query?: string; include?: string } = {};

  if (query !== `{"and":[]}`) {
    finalQuery.query = query;
  }
  //@ts-ignore

  if (includeString !== `&include=[`) {
    finalQuery.include = `${includeString}]`;
  }

  return finalQuery;
};
