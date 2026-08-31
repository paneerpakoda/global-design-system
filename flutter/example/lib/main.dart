import 'package:flutter/material.dart';
import 'package:global_ds/global_ds.dart';

void main() => runApp(const GlobalDSExample());

class GlobalDSExample extends StatelessWidget {
  const GlobalDSExample({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GlobalDS Flutter example',
      theme: DsTheme.light,
      home: Scaffold(
        appBar: AppBar(title: const Text('GlobalDS')),
        body: Center(
          child: RibButton(
            label: 'Continue',
            onPressed: () {},
          ),
        ),
      ),
    );
  }
}
