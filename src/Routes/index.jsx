import Login from "../pages/Login";
import Index from "../pages/Admin/DashBroad";
import List from "../pages/Admin/Products/List";
import Edit from "../pages/Admin/Products/Edit";
import Pagenotfound from "../pages/PageNotFound";
import Notice from '../pages/Admin/notices/index';
import User from '../pages/Admin/users/userList';
import UserEdit from '../pages/Admin/users/userEdit';
import Order from '../pages/Admin/orders/orderList';
import OrderEdit from "../pages/Admin/orders/orderEdit";
import ProductCategory from "../pages/Admin/productCategory/productCategory";
import ProductCategoryEdit from "../pages/Admin/productCategory/productCategoryEdit";
import ScreeningList from '../pages/Admin/Products/ScreeningList';
import Setting from "../pages/Admin/setting";
import ViewCID from "../pages/Admin/productCategory/viewID";
import ViewUID from "../pages/Admin/users/viewID";

export const mainRoutes = [
    {
        path:"/login",
        component:Login
    }, 
    {
        path:"/404",
        component:Pagenotfound
    }
];  
export const adminRoutes = [
    {
        path:"/admin/dashbroad",
        component:Index,
        isShow:true,
        title:'broad',
        icon:'bar-chart'
    },
    {
        path:"/admin/products",
        component:List,
        isShow:true,
        exact:true,
        title:'goods',
        icon:'shop'
    },
    {
        path:"/admin/products/edit/:id?",
        component:Edit, 
        isShow:false
    },
    {
        path:"/admin/products/ScreeningList/:name?",
        component:ScreeningList,
        isShow:false
    },
    {
        path:"/admin/notices",
        component:Notice, 
        isShow:false
    },
    {
        path:"/admin/setting",
        component:Setting,
        isShow:false
    },
    {
        path:"/admin/users",
        component:User,
        isShow:true,
        exact:true,
        title:'users',
        icon:'user'
    },
    {
        path:"/admin/users/userEdit/:id?",
        component:UserEdit,
        isShow:false
    },
    {
        path:"/admin/users/viewID/:id?",
        component:ViewUID,
        isShow:false,
    },
    {
        path:"/admin/orders",
        component:Order,
        isShow:true,
        exact:true,
        title:'orders',
        icon:'account-book'
    },
    {
        path:"/admin/orders/orderEdit/:id?",
        component:OrderEdit,
        isShow:false
    },
    {
        path:"/admin/productCategory",
        component:ProductCategory,
        isShow:true,
        exact:true,
        title:'productCategory',
        icon:'unordered-list'
    },
    {
        path:"/admin/productCategory/productCategoryEdit/:id?",
        component:ProductCategoryEdit,
        isShow:false,
    },
    {
        path:"/admin/productCategory/viewID/:id?",
        component:ViewCID,
        isShow:false,
    }
];