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
    _refreshUsers();
  }

  void _deleteUser(index) {
    userDelete(_users[index]).then((data) {
      if (data["success"]) {}
    });
  }

  Future<Null> _refreshUsers() {
    return userGetList().then((data) {
      if (data["success"]) {
        List userList = data["userList"] as List;
        print(userList);
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
      body: Container(
        child: RefreshIndicator(
          onRefresh: _refreshUsers,
          child: Column(
            children: <Widget>[
              ListTile(title: Text("Registered Users:")),
              Expanded(
                child: ListView.builder(
                  itemCount: _users.length,
                  itemBuilder: (context, index) {
                    final item = _users[index];
                    return Dismissible(
                      onDismissed: (_) {
                        this._deleteUser(index);
                        _users.removeAt(index);
                        Scaffold.of(context).showSnackBar(
                            new SnackBar(content: new Text("$item dismissed")));
                      },
                      movementDuration: Duration(milliseconds: 100),
                      direction: DismissDirection.horizontal,
                      key: Key(item),
                      child: ListTile(
                        title: Text('$item'),
                      ),
                      background: Container(
                        color: Colors.red,
                        child: Text("Deleting"),
                        alignment: Alignment.centerRight,
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
