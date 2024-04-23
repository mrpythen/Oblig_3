package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class BilettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBilett(Kinobilett innBilett){
        String sql = "INSERT INTO Kinobilett(film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?,?,?,?,?,?)";
        db.update(sql,innBilett.getFilm(),innBilett.getAntall(),innBilett.getFornavn(),innBilett.getEtternavn(),
            innBilett.getTelefonnr(),innBilett.getEpost());
    }
    public List<Kinobilett> hentAlleBiletter(){
        String sql = "SELECT * FROM Kinobilett ORDER BY etternavn";
        List<Kinobilett> alleKunder = db.query(sql,new BeanPropertyRowMapper<>(Kinobilett.class));
        return alleKunder;
    }
    public void slettAlleBiletter(){
        String sql = "DELETE FROM Kinobilett";
        db.update(sql);
    }
}

