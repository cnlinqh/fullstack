import 'package:flutter/material.dart';
import 'package:mobile/pages/data.dart';
import 'package:mobile/pages/user.dart';

class HomePage extends StatefulWidget {
  HomePage({Key key}) : super(key: key);
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  int _tabIndex = 0;
  var _pageList = [UserPage(), DataPage()];
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _pageList[_tabIndex],
      bottomNavigationBar: new BottomNavigationBar(
        items: <BottomNavigationBarItem>[
          new BottomNavigationBarItem(
            title: new Text("user"),
            icon: Icon(Icons.verified_user),
          ),
          new BottomNavigationBarItem(
            title: new Text("Data"),
            icon: Icon(Icons.details),
          ),
        ],
        type: BottomNavigationBarType.fixed,
        currentIndex: _tabIndex,
        onTap: (index) {
          setState(() {
            _tabIndex = index;
          });
        },
      ),
    );
  }
}
