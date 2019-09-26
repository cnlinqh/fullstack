import 'package:flutter/material.dart';
import 'package:mobile/pages/login.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    
    return new MaterialApp(
      title: "My Mobile App",
      theme: ThemeData(
        primaryColor: Colors.blue,
      ),
      home: LoginPage(),
    );
  }
}
