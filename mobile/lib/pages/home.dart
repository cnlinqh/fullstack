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
      appBar: AppBar(
        title: Text("My App"),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.person_outline),
            onPressed: () {},
          )
        ],
      ),
      drawer: MyDrawer(),
      // body: _pageList[_tabIndex],
      body: IndexedStack(
        index: _tabIndex,
        children: _pageList,
      ),
      bottomNavigationBar: new BottomNavigationBar(
        items: <BottomNavigationBarItem>[
          new BottomNavigationBarItem(
            title: new Text("user"),
            icon: Icon(Icons.supervisor_account),
          ),
          new BottomNavigationBarItem(
            title: new Text("Data"),
            icon: Icon(Icons.subject),
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

class MyDrawer extends StatelessWidget {
  const MyDrawer({Key key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Drawer(
        child: MediaQuery.removePadding(
          context: context,
          removeTop: true,
          child: Column(
            children: <Widget>[
              Padding(
                padding: const EdgeInsetsDirectional.only(top: 38.0),
                child: Row(
                  children: <Widget>[
                    Text("Welcome"),
                  ],
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
