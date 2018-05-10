
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';


export const create = () => ({ type: POST });
export const update = () => ({ type: PUT });
export const del = () => ({ type: DELETE });

