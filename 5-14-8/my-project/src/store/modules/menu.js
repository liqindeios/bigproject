export default {
    state: {
        navTree: [],  // 导航菜单树
    },
    getters: {
   
    },
    mutations: {
        setMenuTree(state, navTree){  // 设置导航菜单树
            state.navTree = navTree;
        }
    },
    actions: {
        
    }
}