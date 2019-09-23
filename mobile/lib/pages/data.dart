import 'package:flutter/material.dart';

class DataPage extends StatefulWidget {
  DataPage({Key key}) : super(key: key);

  _DataPageState createState() => _DataPageState();
}

class _DataPageState extends State<DataPage> {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(title: Text("Data")),
      body: Center(
        child: Text("Data"),
      ),
    );
  }
}
