import 'package:flutter/material.dart';
import 'package:mobile/pages/register.dart';

class LoginPage extends StatefulWidget {
  LoginPage({Key key}) : super(key: key);

  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    final nameField = TextField(
      decoration: InputDecoration(
        contentPadding: EdgeInsets.all(20),
        hintText: "Name",
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(32),
        ),
      ),
    );
    final passwordField = TextField(
      obscureText: true,
      decoration: InputDecoration(
        contentPadding: EdgeInsets.all(20),
        hintText: "Password",
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(32),
        ),
      ),
    );

    final loginButton = RaisedButton(
      child: Text("Login"),
      onPressed: () {},
    );

    final registerButton = FlatButton(
      child: Text("Sign Up"),
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => RegisterPage()),
        );
      },
    );
    return Scaffold(
      appBar: AppBar(
        title: Text("Login"),
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            nameField,
            passwordField,
            loginButton,
            registerButton,
          ],
        ),
      ),
    );
  }
}
