import 'package:flutter/material.dart';
import 'package:mobile/pages/douban/douban.dart';
import 'package:mobile/pages/register.dart';
import 'package:mobile/pages/home.dart';
import 'package:mobile/utils/client.dart';
import 'package:mobile/utils/reqres.dart';


class LoginPage extends StatefulWidget {
  LoginPage({Key key}) : super(key: key);

  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  void initState() {
    super.initState();
    checkSecureStorage().then((all) {
      var name = all['name'];
      var token = all['token'];
      print("name  (SecureStore)= " + name.toString());
      print("token (SecureStore)= " + token.toString());
      if (name != "" && token != "") {
        validateSecureStorage(name, token).then((data) {
          if (data["username"] == name) {
            setCurrentUser(name, token);
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => HomePage()),
            );
          }
        });
      }
    });
  }

  final _nameFieldController = TextEditingController();
  var _nameError = "";

  final _passwordFieldController = TextEditingController();
  var _passwordError = "";
  bool _doValidation() {
    var name = this._nameFieldController.text;
    if (name == "") {
      setState(() {
        this._nameError = "Name is required!";
      });
      return false;
    } else {
      setState(() {
        this._nameError = "";
      });
    }

    var password = this._passwordFieldController.text;
    if (password == "") {
      setState(() {
        this._passwordError = "Password is required!";
      });
      return false;
    } else {
      setState(() {
        this._passwordError = "";
      });
    }

    return true;
  }

  void _doLogin(context) {
    if (_doValidation()) {
      var name = this._nameFieldController.text;
      var password = this._passwordFieldController.text;
      userLogin(name, password).then((data) {
        if (data["success"]) {
          setCurrentUser(data["name"], data["token"]);
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => HomePage()),
          );
        } else {
          setCurrentUser("", "");
          data["message"] != ""
              ? _ackAlert(context, data["message"])
              : _ackAlert(context, "Login Failed!");
        }
      });
    }
  }

  Future<void> _ackAlert(BuildContext context, String message) {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Fail'),
          content: Text(message),
          actions: <Widget>[
            FlatButton(
              child: Text('Ok'),
              onPressed: () {
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final nameField = TextField(
      decoration: InputDecoration(
        contentPadding: EdgeInsets.all(10),
        hintText: "Name",
        // labelText: "Name",
        errorText: this._nameError == "" ? null : this._nameError,
        prefixIcon: Icon(Icons.account_circle),
        suffixIcon: IconButton(
          icon: Icon(Icons.clear),
          onPressed: _nameFieldController.clear,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15),
        ),
      ),
      controller: _nameFieldController,
      maxLength: 40,
      maxLines: 1,
      autofocus: false,
      textAlign: TextAlign.left,
      style: TextStyle(
        fontSize: 25,
        color: Colors.blue,
      ),
    );
    final passwordField = TextField(
      obscureText: true,
      decoration: InputDecoration(
        contentPadding: EdgeInsets.all(10),
        hintText: "Password",
        // labelText: "Password",
        errorText: this._passwordError == "" ? null : this._passwordError,
        prefixIcon: Icon(Icons.security),
        suffixIcon: IconButton(
          icon: Icon(Icons.clear),
          onPressed: _passwordFieldController.clear,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15),
        ),
      ),
      controller: _passwordFieldController,
      maxLength: 40,
      maxLines: 1,
      autofocus: false,
      textAlign: TextAlign.left,
      style: TextStyle(
        fontSize: 25,
        color: Colors.blue,
      ),
    );
    final loginButton = RaisedButton(
      child: Text("Login"),
      onPressed: () {
        _doLogin(context);
      },
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
    final doubanButton = FlatButton(
      child: Text("Douban"),
      onPressed: () {
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => DoubanPage()),
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
            doubanButton,
          ],
        ),
      ),
    );
  }
}
