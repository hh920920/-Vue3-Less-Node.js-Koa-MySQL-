var mail = {
  // 发件人
  from: '1414287034@qq.com>',
  // 主题
  subject: '小熊猫激活验证',
  // 收件人
  to: '56004761@qq.com',
  // 邮件内容，HTML格式
  text: `尊敬的${user.name}，您好！点击链接即可激活您的极客教程
      网账号,http://localhost:3000/checkCode?name=${user.name}&code=${user.code}为保障您的帐号安全，请在24小时内点击该链接，您也可以将链接复制到浏览器地址栏访问。 若如果您并未尝试修改密码，请忽略本邮件，由此给您带来的不便请谅解。本邮件由系统自动发出，请勿直接回复！` //接收激活请求的链接
}
// send(mail)

// check email code
// exports.checkCode = function (req, res){
//   var username = req.query.name;
//   var code = req.query.code;
//   User.findOne({name: username}, function (err, user){
//       if (user.code === code && (user.date - Date.now()) > 0){
//           User.update({name: username}, {islive: true}, function (err){
//               if (err){
//                   res.json({error: true})
//               }else{
//                   console.log(user)
//                   res.json({ok: true})
//               }
//           });
//       }else{
//         res.json({
//           email: user.mail,
//           failure: true
//         })
//       }
//   });
// }