export { LoginUser } from './login-user';
export { LogoutUser } from './logout-user';
export { addClient } from './clients/add-client';
export { getAllClients } from './clients/get-clients';
export { deleteClientWithId } from './clients/delete-client';
export { editClientWithId } from './clients/edit-client';
export { findClientWithId } from './clients/find-client';
export { getTotalClients } from './clients/get-total-clients';

export { addCategory } from './categories/add-category';
export { getAllCategories,getCategoriesProductAdd } from './categories/get-all-categories';
export { editCategoryWithId } from './categories/edit-category';
export { deleteCategoryWithId } from './categories/delete-category';
export { findCategoryWithId } from './categories/find-category';
export { getTotalCategories } from './categories/get-total-categories';

export { addProduct } from './productos/add-product';
export { getAllProducts } from './productos/get-all-products';
export { editProductWithId } from './productos/edit-product';
export { findProductWithId } from './productos/find-product';
export { deleteProductWithId } from './productos/delete-product';
export { getFiltersProducts } from './productos/get-all-filters';
export { getTotalProducts } from './productos/get-total-products';


export { addPedido } from './pedidos/add-pedido';
export { editPedido } from './pedidos/edit-pedido';
export { updatePedidoStatus } from './pedidos/update-status-pedido';
export { getAllPedidos } from './pedidos/get-all-pedidos';
export { getFieldsPedidos } from './pedidos/get-fields-pedidos';
export { deletePedidoWithId } from './pedidos/delete-pedido';
export { getPedidoWithId } from './pedidos/get-pedido-with-id';

export { createVentaWithPedidoId } from './ventas/create-venta-with-pedidoid';
export { getAllVentas } from './ventas/get-all-ventas';
export { deleteVentaWithId } from './ventas/delete-venta';
export { getTotalVentas } from './ventas/get-total-ventas';

export { getDataAllDashboard } from './dashboard/fetch-data-dashboard';