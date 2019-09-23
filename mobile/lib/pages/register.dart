import 'package:flutter/material.dart';
import 'package:mobile/utils/client.dart';

class RegisterPage extends StatefulWidget {
  RegisterPage({Key key}) : super(key: key);
  _RegisterPageState createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _nameFieldController = TextEditingController();
  var _nameError = "";

  final _passwordFieldController = TextEditingController();
  var _passwordError = "";

  final _password2FieldController = TextEditingController();
  var _password2Error = "";

  @override
  void initState() {
    super.initState();
  }

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

    var password2 = this._password2FieldController.text;
    if (password != password2) {
      setState(() {
        this._password2Error = "Passwords aren't identical!";
      });
      return false;
    } else {
      setState(() {
        this._password2Error = "";
      });
    }
    return true;
  }

  void _doRegistration(context) {
    if (_doValidation()) {
      var name = this._nameFieldController.text;
      var password = this._passwordFieldController.text;
      userSignUp(name, password).then((value) {
        _ackAlert(context);
      });
    }
  }

  Future<void> _ackAlert(BuildContext context) {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Success'),
          content: const Text('Register user successfully!'),
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

    final password2Field = TextField(
      obscureText: true,
      decoration: InputDecoration(
        contentPadding: EdgeInsets.all(10),
        hintText: "Confirm Password",
        // labelText: "Confirm Password",
        errorText: this._password2Error == "" ? null : this._password2Error,
        prefixIcon: Icon(Icons.security),
        suffixIcon: IconButton(
          icon: Icon(Icons.clear),
          onPressed: _password2FieldController.clear,
        ),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(15),
        ),
      ),
      controller: _password2FieldController,
      maxLength: 40,
      maxLines: 1,
      autofocus: false,
      textAlign: TextAlign.left,
      style: TextStyle(
        fontSize: 25,
        color: Colors.blue,
      ),
    );
    final registerButton = RaisedButton(
      child: Text("Register"),
      onPressed: () {
        _doRegistration(context);
      },
    );

    final cancelButton = FlatButton(
      child: Text("Cancel"),
      onPressed: () {
        Navigator.pop(context);
      },
    );
    return Scaffold(
      appBar: AppBar(
        title: Text("Register"),
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
