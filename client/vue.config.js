module.exports = {
    devServer: {
        port: 8080,
        host: 'localhost',
        open: true,
        https: false,
        hotOnly: false,
        proxy:{
            // 配置跨域
            '/api': {
                target: 'http://localhost:5000/api/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api':''
                }
            }
        },
        before: app => {}

    }
}