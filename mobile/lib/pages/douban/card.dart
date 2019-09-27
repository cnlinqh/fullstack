import 'package:flutter/material.dart';
import 'package:flutter_screenutil/flutter_screenutil.dart';
import 'package:mobile/pages/douban/star.dart';

class Card extends StatelessWidget {
  final subject;
  Card(this.subject);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Container(
                  width: ScreenUtil.getInstance().setWidth(260),
                  child: Image.network(subject['cover']),
                ),
                Star(double.parse(subject['rate']), "Vertical"),
              ],
            ),
            Text(
              subject['title'] + "/" + subject['rate'],
              style: TextStyle(
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

