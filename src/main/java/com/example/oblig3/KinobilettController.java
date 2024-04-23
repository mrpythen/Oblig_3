package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@RestController
public class KinobilettController {

   @Autowired
   private BilettRepository rep;


    @PostMapping("/lagre")
    public void lagreBillett(@RequestBody Kinobilett bilett) {
        rep.lagreBilett(bilett);
    }

    @GetMapping("/hentAlle")
    public List<Kinobilett> hentAlle() {
        return rep.hentAlleBiletter();
    }


    @GetMapping("/slett")
    public void slettAlle() {
        rep.slettAlleBiletter();
    }
}
