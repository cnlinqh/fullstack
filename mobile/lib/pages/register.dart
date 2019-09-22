import 'package:flutter/material.dart';

class RegisterPage extends StatefulWidget {
  RegisterPage({Key key}) : super(key: key);

  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
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

    final password2Field = TextField(
      obscureText: true,
      decoration: InputDecoration(
        contentPadding: EdgeInsets.all(20),
        hintText: "Confirm Password",
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(32),
        ),
      ),
    );

    final registerButton = RaisedButton(
      child: Text("Sign In"),
      onPressed: () {},
    );

    final cancelButton = FlatButton(
      child: Text("Cancel"),
      onPressed: () {
        Navigator.pop(context);
      },
    );
    return Scaffold(
      appBar: AppBar(
        title: Text("Sign Up"),
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            nameField,
            passwordField,
            password2Field,
            registerButton,
            cancelButton,
          ],
        ),
      ),
    );
  }
}
