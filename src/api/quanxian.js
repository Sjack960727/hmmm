import { createAPI } from '@/utils/request'

export const getquanxian = data => createAPI('/permissions', 'get', data)

export const getqyonghu = id => createAPI('/menus', 'GET')

export const getpermissions = data => createAPI('/permissions', 'POST', data)

export const postpermissions = id => createAPI(`/permissions/${id}`, 'DELETE')

export const detail = data => createAPI(`/permissions/${data.id}`, 'get', data)

export const update = data => createAPI(`/permissions/${data.id}`, 'put', data)
