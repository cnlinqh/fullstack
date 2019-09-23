import 'package:flutter/material.dart';
import 'package:mobile/utils/client.dart';

class UserPage extends StatefulWidget {
  UserPage({Key key}) : super(key: key);

  _UserPageState createState() => _UserPageState();
}

class _UserPageState extends State<UserPage> {
  List _users = [];
  @override
  void initState() {
    super.initState();
    userGetList().then((data) {
      if (data["success"]) {
        List userList = data["userList"] as List;
        setState(() {
          _users = userList.map((user) => user["name"]).toList();
        });
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(title: Text("User List")),
      body: Column(
        children: <Widget>[
          ListTile(title: Text("Registered Users:")),
          Expanded(
            child: ListView.builder(
              itemCount: _users.length,
              itemBuilder: (BuildContext context, int index) {
                return ListTile(
                  title: Text(
                    "${_users[index]}",
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
