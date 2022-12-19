// 登录、注册
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
// const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// $route GET api/users/test
// @desc 发返回的请求数据
// @access public
// router.get("/test", (req,res) => {
//     res.json({msg: "user login works!"})
// })

// $route POST api/users/register
// @desc 返回json数据
// @access public
router.post("/register", (req,res) => {
    // console.log(req.body);

    // 查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json("邮箱已被注册")
            } else {
                const reqBody = req.body;
                // const avatar = gravatar.url(reqBody.email, {s: '200', r: 'pg', d: 'mm'});

                const newUser = new User({
                    name: reqBody.name,
                    email: reqBody.email,
                    avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202104%2F22%2F20210422220415_2e4bd.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673678890&t=5d44d569cb0958af2015d5d93cf5b048',
                    password: reqBody.password,
                    identity: reqBody.identity
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }


        })
})

// $route POST api/users/login
// @desc 返回token jwt passport
// @access public
router.post('/login',(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email})
        .then(user => {
            if(!user){
                return res.status(404).json('用户不存在！')
            }
            // 密码匹配
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        // res.json({msg:"success"})
                        const rule = {id:user.id,name:user.name,identity:user.identity}
                        // jwt.sign('规则', '加密名字','过期时间','箭头函数');
                        jwt.sign(rule, keys.secretOrKey,{expiresIn: 3600},(err, token) => {
                            if(err) throw err;
                            res.json({
                                success:true,
                                token:'Bearer '+ token
                            });
                        });
                    } else {
                        return res.status(404).json("密码错误")
                    }
                })
        })
})

// $route GET api/users/current
// @desc 返回 current user
// @access Private
router.get('/current',passport.authenticate('jwt', {session:false}), (req,res) =>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        identity: req.user.identity
    });
})
module.exports = router;